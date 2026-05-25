import { LANGUAGES } from "@/constants/language";
import ClassList from "@/features/class/components/class-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: LANGUAGES.META_TITLE_CLASS,
  description: LANGUAGES.META_DES_CLASS,
};

const ClassPage = () => {
  return (
    <ClassList />
  );
};

export default ClassPage;