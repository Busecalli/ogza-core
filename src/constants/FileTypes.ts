export const FILE_TYPES = {
  // Documents
  PDF: { mime: "application/pdf", ext: ".pdf" },
  DOC: { mime: "application/msword", ext: ".doc" },
  DOCX: {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ext: ".docx",
  },
  // Spreadsheets
  XLS: { mime: "application/vnd.ms-excel", ext: ".xls" },
  XLSX: {
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ext: ".xlsx",
  },
  CSV: { mime: "text/csv", ext: ".csv" },
  // Images
  JPEG: { mime: "image/jpeg", ext: ".jpeg" },
  JPG: { mime: "image/jpeg", ext: ".jpg" },
  PNG: { mime: "image/png", ext: ".png" },
  WEBP: { mime: "image/webp", ext: ".webp" },
  // Archives
  ZIP: { mime: "application/zip", ext: ".zip" },
};

export const SUPPORTED_MIME_TYPES = [
  ...new Set(Object.values(FILE_TYPES).map((type) => type.mime)),
];
