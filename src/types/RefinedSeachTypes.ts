import { SelectChangeEvent } from "@mui/material/Select";
import React from "react";

export type RefinedSearchProps = {
    className?: string
    handleClick: (e: React.MouseEvent) => void
}

export type RefinedSearchInputProps = {
    activeTabIndex: number;
    options: Options | null;
    selectedValue: any;
    handleChange: (event: SelectChangeEvent<HTMLSelectElement>) => void;
    handleSubmit: (e: React.MouseEvent) => void;
}
export type Translation = {

    id: string;
      code: string;
      locale: Locale[];
  };
  export type option = {
    id: number;
    name: string;
    value: string;
    label: string;
    translation: Translation
  }
  
  export type Options = {
    artifacts: option[] | [];
    assessmentType: option[];
    period: option[];
    recommendation: option[];
    researchValue: option[];
    risk: option[];
    siteType: option[];
    stateOfConservation: option[];
    tourismValue: option[];
  }
  
  
  export type Languages = {
    id: number;
    name: string;
  };
  
  export type Locale = {
    id: number;
    value: string;
    languages: Languages;
  };
  
  