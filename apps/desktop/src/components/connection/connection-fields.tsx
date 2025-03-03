"use client";

import type { UseFormReturn } from "react-hook-form";
import type { DatabaseType } from "../../types/dbs";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Folder } from "lucide-react";

interface ConnectionFieldsProps {
  dbType: DatabaseType;
  form: UseFormReturn<any>;
}

export function ConnectionFields({ dbType, form }: ConnectionFieldsProps) {
  const renderCommonFields = () => (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Connection Name</FormLabel>
            <FormControl>
              <Input placeholder="My Database Connection" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  const renderPostgresFields = () => (
    <>
      {renderCommonFields()}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="host"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Host</FormLabel>
              <FormControl>
                <Input placeholder="localhost" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="port"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Port</FormLabel>
              <FormControl>
                <Input placeholder="5432" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="database"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Database</FormLabel>
            <FormControl>
              <Input placeholder="postgres" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="postgres" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="ssl"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Use SSL</FormLabel>
              <p className="text-sm text-muted-foreground">
                Enable SSL/TLS encrypted connection
              </p>
            </div>
          </FormItem>
        )}
      />
    </>
  );

  const renderMySQLFields = () => (
    <>
      {renderCommonFields()}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="host"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Host</FormLabel>
              <FormControl>
                <Input placeholder="localhost" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="port"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Port</FormLabel>
              <FormControl>
                <Input placeholder="3306" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="database"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Database</FormLabel>
            <FormControl>
              <Input placeholder="mysql" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="root" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );

  const renderSQLiteFields = () => (
    <>
      {renderCommonFields()}
      <FormField
        control={form.control}
        name="filepath"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Database File</FormLabel>
            <div className="flex gap-2">
              <FormControl>
                <Input placeholder="/path/to/database.sqlite" {...field} />
              </FormControl>
              <Button type="button" variant="outline" size="icon">
                <Folder className="h-4 w-4" />
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="readOnly"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Read Only</FormLabel>
              <p className="text-sm text-muted-foreground">
                Open the database in read-only mode
              </p>
            </div>
          </FormItem>
        )}
      />
    </>
  );

  const renderMongoDBFields = () => (
    <>
      {renderCommonFields()}
      <FormField
        control={form.control}
        name="connectionString"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Connection String</FormLabel>
            <FormControl>
              <Input
                placeholder="mongodb://localhost:27017/mydatabase"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <p className="text-sm text-muted-foreground">
        Or configure individual connection parameters:
      </p>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="host"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Host</FormLabel>
              <FormControl>
                <Input placeholder="localhost" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="port"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Port</FormLabel>
              <FormControl>
                <Input placeholder="27017" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="database"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Database</FormLabel>
            <FormControl>
              <Input placeholder="mydatabase" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="authSource"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Auth Source</FormLabel>
            <FormControl>
              <Input placeholder="admin" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  const renderMSSQLFields = () => (
    <>
      {renderCommonFields()}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="server"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Server</FormLabel>
              <FormControl>
                <Input placeholder="localhost\SQLEXPRESS" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="port"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Port</FormLabel>
              <FormControl>
                <Input placeholder="1433" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="database"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Database</FormLabel>
            <FormControl>
              <Input placeholder="master" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="authType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Authentication</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select authentication type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="sqlAuth">
                  SQL Server Authentication
                </SelectItem>
                <SelectItem value="windowsAuth">
                  Windows Authentication
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {form.watch("authType") === "sqlAuth" && (
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="sa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      <FormField
        control={form.control}
        name="encrypt"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Encrypt Connection</FormLabel>
              <p className="text-sm text-muted-foreground">
                Enable connection encryption
              </p>
            </div>
          </FormItem>
        )}
      />
    </>
  );

  switch (dbType) {
    case "postgres":
      return renderPostgresFields();
    case "mysql":
      return renderMySQLFields();
    case "sqlite":
      return renderSQLiteFields();
    case "mongodb":
      return renderMongoDBFields();
    case "mssql":
      return renderMSSQLFields();
    default:
      return renderCommonFields();
  }
}
