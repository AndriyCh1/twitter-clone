export const convertToBase64 = (
  file: File,
  onConvert: (img: string) => void
) => {
  const reader = new FileReader();
  reader.onload = () => onConvert(reader.result as string);
  reader.readAsDataURL(file);
};
