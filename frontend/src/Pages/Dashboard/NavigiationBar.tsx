import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure, HStack, Container, Center, Spacer, Avatar, Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import {Link, Outlet} from 'react-router-dom';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { FirebaseServices, auth, currentUser } from "../../Utils/firebase"
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { User } from 'firebase/auth';

interface navigation_items_props {
  items: Array<NavItem>
}

export const NavBar = () => {

  const navigate = useNavigate();
  useEffect(() => {
    FirebaseServices.is_logged_in().then((res) => {
      if (!res) {
        navigate("/login")
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [user, setUser] = useState<User | null>(currentUser);
  const { isOpen, onToggle } = useDisclosure();

  const get_nav_items = () => {
    return NAV_ITEMS_FOR_ANONYMOUS_USER
  }

  const get_user = () => {
    const user = auth.currentUser
    if (user) {
      setUser(user)
    }
  }

  useEffect(() => {
    get_user()
  }, [])

  const logInRedirect = () => {
    navigate("/login")
  }



  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Center>
          <Spacer width={"40px"}></Spacer>
          <Text
              textTransform={'uppercase'}
              display="inline-block"
              fontSize="20"
              bgGradient="linear(to-r, brand.200, brand.300)"
              backgroundClip="text"
              p={2}
              alignSelf={'flex-start'}
              rounded={'md'}>
            LeetAI
          </Text>
        </Center>
        <Flex
            flex={{ base: 1 }}
            justify={{ base: 'center', md: 'start' }}
            verticalAlign={'middle'}>
          <HStack>

            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav items={get_nav_items()}/>
            </Flex>
          </HStack>
        </Flex>
        <>
          <HStack>
            <ColorModeSwitcher justifySelf="flex-end"/>
            <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={user?.photoURL!}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={user?.photoURL!}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{user?.displayName}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={()=>{FirebaseServices.sign_out(); logInRedirect()}}>Logout</MenuItem>
                </MenuList>
              </Menu>
          </HStack>
        </>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav  items={get_nav_items()}/>
      </Collapse>
      <Box p="4">
        <Container maxW='l' maxWidth={'1200px'}>
          <Outlet/>
        </Container>
      </Box>
    </Box>
  );
}

const DesktopNav = ({items}: navigation_items_props) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {items.map((navItem) => (
        <Box key={navItem.label} >
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                to={navItem.route ?? '#'}
                color={linkColor}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, route, subLabel }: NavItem) => {
  return (
    <Link
      to={route ?? '#'}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({items}: navigation_items_props) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {items.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, route }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        to={route ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link
                  key={child.label}
                  to={child.route ?? '#'}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  route?: string;
}

const NAV_ITEMS_FOR_ANONYMOUS_USER: Array<NavItem> = [
  {
    label: 'Home',
    route: 'home'
  },
]
