import { useState } from "react";
import { FileDown, FileText, FileSpreadsheet, ChevronDown } from "lucide-react";

const EXPORT_OPTIONS = [
  { id: "pdf", label: "Export PDF", icon: FileText, description: "PDF Document" },
  { id: "excel", label: "Export Excel", icon: FileSpreadsheet, description: "XLSX Spreadsheet" },
  { id: "csv", label: "Export CSV", icon: FileDown, description: "CSV File" },
];

export function ExportMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = () => {
    setIsOpen(false);
    // UI only - no backend integration
  };

  return (
    <div className="rp-export">
      <button
        className="rp-export__btn"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      >
        <FileDown size={16} />
        Export
        <ChevronDown size={14} className={`rp-export__chevron ${isOpen ? "rp-export__chevron--open" : ""}`} />
      </button>

      {isOpen && (
        <div className="rp-export__menu">
          {EXPORT_OPTIONS.map((option) => (
            <button
              key={option.id}
              className="rp-export__item"
              onClick={() => handleExport(option.id)}
            >
              <option.icon size={16} />
              <span className="rp-export__label">{option.label}</span>
              <span className="rp-export__desc">{option.description}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}