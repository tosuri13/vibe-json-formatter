import { useState } from "react";
import { toast } from "sonner";

interface UseJsonFormatterOptions {
  defaultIndent?: number;
}

interface UseJsonFormatterReturn {
  input: string;
  setInput: (value: string) => void;
  output: string;
  indent: number;
  setIndent: (value: number) => void;
  sortKeys: boolean;
  setSortKeys: (value: boolean) => void;
  formatJson: () => void;
}

export const useJsonFormatter = ({
  defaultIndent = 2,
}: UseJsonFormatterOptions = {}): UseJsonFormatterReturn => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [indent, setIndent] = useState<number>(defaultIndent);
  const [sortKeys, setSortKeys] = useState<boolean>(false);

  const formatJson = () => {
    if (!input) {
      setOutput("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const replacer = sortKeys
        ? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          (key: string, value: any) => {
            if (value && typeof value === "object" && !Array.isArray(value)) {
              return Object.keys(value)
                .sort()
                .reduce((result: Record<string, unknown>, key) => {
                  result[key] = value[key];
                  return result;
                }, {});
            }
            return value;
          }
        : undefined;

      const formatted = JSON.stringify(parsed, replacer, indent);
      setOutput(formatted);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Oops! Failed to parse JSON", {
          description: error.message,
        });
      }
      setOutput("");
    }
  };

  return {
    input,
    setInput,
    output,
    indent,
    setIndent,
    sortKeys,
    setSortKeys,
    formatJson,
  };
};
