import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import {
  closeButton,
  search,
  searchIcon,
  searchInput,
} from "./SearchInput.css";
import { Button, Input, SearchField } from "react-aria-components";

export const SearchInput = () => {
  return (
    <SearchField className={search} aria-label="Search field">
      <Input className={searchInput} />
      <MagnifyingGlassIcon className={searchIcon} size="1rem" />
      <Button className={closeButton}>
        <XIcon size="0.75rem" />
      </Button>
    </SearchField>
  );
};

SearchInput.displayName = "SearchInput";
