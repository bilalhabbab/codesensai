import React from "react";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

const LANG_VERSIONS = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    python: "3.10.0",
  };

interface LangSwitchProps {
    language: string;
    onSelect: (language: string) => void;
}

const LangSwitch = ({ language, onSelect } : LangSwitchProps) => {
    const languages = Object.entries(LANG_VERSIONS);
    return (
      <Flex w='100%' mb={5} justifyItems='center' >
        <Menu>
          <MenuButton as={Button} h="30px" fontSize='sm'>{language} ∨</MenuButton>
          <MenuList>
            {languages.map(([language, version]) => (
              <MenuItem key={language} onClick={() => onSelect(language)}>
                {language}
                <Text as="span" color="gray.600" fontSize="sm">
                  ({version})
                </Text>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    );
  };
  export default LangSwitch;