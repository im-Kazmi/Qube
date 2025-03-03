"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { Button } from "../ui/button";
import { Form } from "../ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DatabaseSelector } from "./database-selector";
import { ConnectionFields } from "./connection-fields";
import { type DatabaseType } from "../../types/dbs";
import { getConnectionSchema } from "../../schemas/connection-schemas";

interface ConnectionFormProps {
  onSave: (data: any) => void;
  initialValues?: any;
  title?: string;
  description?: string;
}

export function ConnectionForm({
  onSave,
  initialValues = {},
  title = "Database Connection",
  description = "Configure your database connection settings.",
}: ConnectionFormProps) {
  const [dbType, setDbType] = useState<DatabaseType>("postgres");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const connectionSchema = getConnectionSchema(dbType);

  const form = useForm<z.infer<typeof connectionSchema>>({
    resolver: zodResolver(connectionSchema),
    defaultValues: initialValues,
  });

  const handleDbTypeChange = (type: DatabaseType) => {
    setDbType(type);
    form.reset(initialValues);
    setConnectionStatus(null);
  };

  const handleTestConnection = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    setIsConnecting(true);
    setConnectionStatus(null);

    try {
      const formData = form.getValues();
      // TODO: i will  create a testConnection function for testing a connection
      // const result = await testConnection(dbType, formData);

      // setConnectionStatus({
      //   success: result.success,
      //   message: result.message,
      // });
    } catch (error) {
      setConnectionStatus({
        success: false,
        message: error instanceof Error ? error.message : "Connection failed",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const onSubmit = (data: z.infer<typeof connectionSchema>) => {
    onSave({ type: dbType, ...data });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DatabaseSelector value={dbType} onChange={handleDbTypeChange} />

            <ConnectionFields dbType={dbType} form={form} />

            {connectionStatus && (
              <div
                className={`p-3 rounded-md text-sm ${connectionStatus.success ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"}`}
              >
                {connectionStatus.message}
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleTestConnection}
          disabled={isConnecting}
        >
          {isConnecting ? "Testing..." : "Test Connection"}
        </Button>
        <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
          Save Connection
        </Button>
      </CardFooter>
    </Card>
  );
}
