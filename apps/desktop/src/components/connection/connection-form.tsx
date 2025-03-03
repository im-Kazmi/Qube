import { DatabaseType } from "../../types/dbs";
import { useState } from "react";

interface ConnectionFormProps {
  onSave: (data: any) => void;
  initialValues?: any;
  title?: string;
  description?: string;
}

export const ConnectionForm = ({
  onSave,
  initialValues = {},
  title = "Database Connection",
  description = "Configure your database connection settings.",
}: ConnectionFormProps) => {
  const [dbType, setDbType] = useState<DatabaseType>("postgres");
};
