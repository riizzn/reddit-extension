import { useEffect, useState } from "react";
export interface IFormData {
  apiKey: string;
  endpoint: string;
}
export const useFormData = () => {
  const [formData, setFormData] = useState<IFormData>({
    endpoint: "",
    apiKey: "",
  });
  useEffect(() => {
    chrome.storage.local.get(["formData"], (result) => {
      if (result.formData) {
        setFormData(result.formData);
      }
    });
  }, []);
  return { formData, setFormData };
};
