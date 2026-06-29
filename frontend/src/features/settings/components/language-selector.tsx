import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export function LanguageSelector() {
  return (
    <div className="space-y-2">
      <Label htmlFor="language-selector">Idioma</Label>
      <Select id="language-selector" value="es" disabled>
        <option value="es">Español</option>
      </Select>
      <p className="text-muted-foreground text-sm">
        Por ahora la aplicación está disponible sólo en español.
      </p>
    </div>
  );
}
