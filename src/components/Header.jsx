import {
  Box,
  Flex,
  Heading,
  Container,
  Stack,
  Text,
  Link,
  Icon,
  useColorModeValue,
  Badge,
  Img,
} from '@chakra-ui/react'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import {
  FaCss3,
  FaHtml5,
  FaJs,
  FaNodeJs,

  FaReact,
 
  FaVuejs,
  FaGithub,
  FaFigma,
  FaUbuntu,
  FaGitlab,
} from 'react-icons/fa'
import { SiDjango, SiGraphql } from 'react-icons/si'
import '../index.css'

export default function Header() {
  return (
    <>
      <Flex>
        <Container maxW="60ch">
          <Stack
            as={Box}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 30, md: '5rem' }}
            direction="column"
          >
            <Box w="36" marginX="auto">
              <Img
                borderRadius="full"
                src="https://i.ibb.co/svMfvx1/avatar.png"
              />
            </Box>
            <Box
              display="flex"
              backdropBlur="md"
              borderColor="black"
              background={useColorModeValue('gray.200', 'whiteAlpha.100')}
              paddingX="6"
              paddingY="3"
              borderRadius="lg"
              margin="auto"
              justifyContent="center"
              boxSizing="unset"
            >
              <Heading
                fontWeight={400}
                fontSize={{ base: 20, md: 40 }}
                alignItems="center"
                lineHeight="110%"
                fontFamily="mono"
              >
                Hey, I'm Vinayak <span className="wave"> 👋</span>
              </Heading>
            </Box>
            <Box alignItems="center">
              <Text
                fontWeight={500}
                fontSize={{ base: 20, md: 40 }}
                fontFamily="mono"
                fontSize={{ md: 'large' }}
                marginX="1"
                boxSizing="content-box"
              >
                <span className="highlighted-word">
                 Upcoming Associate Application Developer @Oracle
                </span>  
              </Text>
            </Box>
            <Box alignItems="center">
              <Text
                fontWeight={300}
                fontFamily="mono"
                fontSize={{ md: 'large' }}
                marginX="1"
                boxSizing="content-box"
              >
                <span className="highlighted-word">
                  Information Science Engineering Student
                </span>
                , <span className="highlighted-word">Frontend Developer</span>{' '}
                and <span className="highlighted-word">Tech Enthusiast</span>.
              </Text>
            </Box>
            <Box justifyContent="center">
              <Badge
                as="a"
                variant="outline"
                marginBottom="5"
                fontSize="1.2rem"
                fontFamily="mono"
              >
                stack
              </Badge>
              <Stack
                paddingX="14"
                justify="center"
                direction="row"
                wrap="wrap"
                fontSize="3.2rem"
                spacing="6"
              >
                <Link pointerEvents="none" as="span">
                  <Icon as={FaJs} />
                </Link>
                <Link pointerEvents="none">
                  <Icon as={FaHtml5} />
                </Link>
                <Link pointerEvents="none">
                  <Icon as={FaCss3} />
                </Link>
                <Link pointerEvents="none">
                  <Icon as={FaVuejs} />
                </Link>
                <Link pointerEvents="none">
                  <Icon as={FaNodeJs} />
                </Link>
                <Link pointerEvents="none">
                  <Icon as={SiGraphql} />
                </Link>
                <Link pointerEvents="none">
                  <Icon as={FaReact} />
                </Link>
              </Stack>
              <Badge
                as="a"
                variant="outline"
                marginBottom="5"
                fontSize="1.2rem"
                fontFamily="mono"
              >
                Tools
              </Badge>
              <Stack
                paddingX="14"
                justify="center"
                direction="row"
                wrap="wrap"
                fontSize="3.2rem"
                spacing="6"
              >
                <Link pointerEvents="none" as="span">
                  <Icon as={FaGithub} />
                </Link>
                <Link pointerEvents="none" as="span">
                  <Icon as={FaFigma} />
                </Link>
                <Link pointerEvents="none" as="span">
                  <Icon as={FaUbuntu} />
                </Link>
                <Link pointerEvents="none" as="span">
                  <Icon as={FaGitlab} />
                </Link>
                
              </Stack>
              <Badge
                as="a"
                variant="outline"
                marginBottom="2"
                fontSize="1.2rem"
                fontFamily="mono"
              >
                On the web
              </Badge>
              <Stack as={Box} marginY="5" spacing="5">
                <Text fontSize="2xl" fontWeight="bold">
                  <Link href="https://github.com/VinayakDubey07" isExternal>
                    <Icon as={FiGithub} /> @Vinayak
                  </Link>
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  <Link href="https://linkedin.com/in/vinayaksde" isExternal>
                    <Icon as={FiLinkedin} /> @Vinayak
                  </Link>
                </Text>
              </Stack>
              <Text marginTop="6" fontFamily="mono">
                Get in touch <span>👉</span>{' '}
                <a className="mail" href="mailto:contact@vinayak.cloud">
                  contact@vinayak.cloud
                </a>
              </Text>
            </Box>
          </Stack>
        </Container>
      </Flex>
    </>
  )
}
