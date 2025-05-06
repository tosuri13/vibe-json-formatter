"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useJsonFormatter } from "@/hooks/useJsonFormatter";
import { Copy, Wand2 } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function AppPage() {
  const {
    input,
    setInput,
    output,
    indent,
    setIndent,
    sortKeys,
    setSortKeys,
    formatJson,
  } = useJsonFormatter();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  return (
    <main className="container mx-auto flex h-screen flex-col p-4">
      <h1 className="mb-4 text-center font-bold text-3xl">
        ✨ Vibe JSON Formatter ✨
      </h1>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="indent">Indent Width</Label>
            <Input
              id="indent"
              type="number"
              min={0}
              max={8}
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="w-20"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="sort-keys">Sort Keys</Label>
            <Switch
              id="sort-keys"
              checked={sortKeys}
              onCheckedChange={setSortKeys}
            />
          </div>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="flex flex-col p-4">
            <div className="flex items-center justify-between">
              <Label className="ml-1 text-xl" htmlFor="input">
                Input
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={formatJson}
                disabled={!input}
              >
                <Wand2 className="h-4 w-4" />
                Format
              </Button>
            </div>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 font-mono"
              placeholder="Paste your JSON here"
            />
          </Card>
          <Card className="flex flex-col p-4">
            <div className="flex items-center justify-between">
              <Label className="ml-1 text-xl" htmlFor="output">
                Output
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                disabled={!output}
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="flex-1 font-mono"
            />
          </Card>
        </div>
      </div>
      <Toaster />
    </main>
  );
}
