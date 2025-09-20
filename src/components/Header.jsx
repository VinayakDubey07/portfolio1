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
import { FiGithub, FiLinkedin, FiDatabase, FiServer, FiLayers } from 'react-icons/fi'
//import { SiOpenai, SiMongodb, SiElastic, SiAmazonaws } from 'react-icons/si'
import { SiOpenai, SiMongodb, SiElastic, SiAmazonaws } from 'react-icons/si'
import {
  FaCss3,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
  FaGithub,
  FaUbuntu,
  FaGitlab,
  FaJenkins
} from 'react-icons/fa'
import {
  SiGraphql,
  SiTensorflow,
  SiKeras,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiCplusplus,
  SiPython,
  SiNextdotjs,
  SiBootstrap,
  SiMysql,
  SiNetlify,
  SiVercel,
  SiBlockchaindotcom,
  SiMedium,
} from 'react-icons/si'
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
                  Software Developer @Oracle
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
                  Driving the future of AI-powered applications beyond traditional limits.
                </span>
                , <span className="highlighted-word">Software Developer</span>{' '}
                and <span className="highlighted-word">Tech Enthusiast</span>.
              </Text>
            </Box>
            <Box justifyContent="center">
              {/* Languages Section */}
              <Badge
                as="a"
                variant="outline"
                marginBottom="5"
                fontSize="1.2rem"
                fontFamily="mono"
              >
                Languages
              </Badge>
              <Stack
                paddingX="14"
                justify="center"
                direction="row"
                wrap="wrap"
                fontSize="3.2rem"
                spacing="6"
                marginBottom="8"
              >
                <Link pointerEvents="none" as="span">
                  <Icon as={SiCplusplus} />
                </Link>
                <Link pointerEvents="none">
                  <Icon as={SiPython} />
                </Link>
                <Link pointerEvents="none">
                  <Icon as={FaJs} />
                </Link>
                <Link pointerEvents="none">
                  <Icon as={FaHtml5} />
                </Link>
                <Link pointerEvents="none">
                  <Icon as={SiMysql} />
                </Link>
              </Stack>

              {/* Frameworks Section */}
              <Badge
                as="a"
                variant="outline"
                marginBottom="5"
                fontSize="1.2rem"
                fontFamily="mono"
              >
                Frameworks
              </Badge>
              <Stack
                paddingX="14"
                justify="center"
                direction="row"
                wrap="wrap"
                fontSize="3.2rem"
                spacing="6"
                marginBottom="8"
              >
                <Link pointerEvents="none">
                  <Icon as={FaCss3} />
                </Link>
                <Link pointerEvents="none">
                  <Icon as={SiBootstrap} />
                </Link>
                <Link pointerEvents="none">
                  <Icon as={FaNodeJs} />
                </Link>
                <Link pointerEvents="none">
                  <Icon as={SiNextdotjs} />
                </Link>
                <Link pointerEvents="none">
                  <Icon as={FaReact} />
                </Link>
              </Stack>

              {/* Developer Tools Section */}
              <Badge
                as="a"
                variant="outline"
                marginBottom="5"
                fontSize="1.2rem"
                fontFamily="mono"
              >
                Developer Tools
              </Badge>
              <Stack
                paddingX="14"
                justify="center"
                direction="row"
                wrap="wrap"
                fontSize="3.2rem"
                spacing="6"
                marginBottom="8"
              >
                <Link pointerEvents="none" as="span">
                  <Icon as={FaGithub} />
                </Link>
                <Link pointerEvents="none" as="span">
                  <Icon as={FaUbuntu} />
                </Link>
                <Link pointerEvents="none" as="span">
                  <Icon as={FaGitlab} />
                </Link>
                <Link pointerEvents="none" as="span">
                  <Icon as={FaJenkins} />
                </Link>
                <Link pointerEvents="none" as="span">
                  <Icon as={SiNetlify} />
                </Link>
              </Stack>

              {/* Libraries Section */}
              <Badge
                as="a"
                variant="outline"
                marginBottom="5"
                fontSize="1.2rem"
                fontFamily="mono"
              >
                Libraries
              </Badge>
              <Stack
                paddingX="14"
                justify="center"
                direction="row"
                wrap="wrap"
                fontSize="3.2rem"
                spacing="6"
                marginBottom="8"
              >
                <Link pointerEvents="none" as="span">
                  <Icon as={SiTensorflow} />
                </Link>
                <Link pointerEvents="none" as="span">
                  <Icon as={SiKeras} />
                </Link>
                <Link pointerEvents="none" as="span">
                  <Icon as={SiPandas} />
                </Link>
                <Link pointerEvents="none" as="span">
                  <Icon as={SiNumpy} />
                </Link>
                <Link pointerEvents="none" as="span">
                  <Icon as={SiScikitlearn} />
                </Link>
              </Stack>

              {/* AI/ML Skills Section */}
              <Badge
                as="a"
                variant="outline"
                marginBottom="5"
                fontSize="1.2rem"
                fontFamily="mono"
              >
                AI/ML Skills
              </Badge>
              <Stack
                paddingX="14"
                justify="center"
                direction="row"
                wrap="wrap"
                fontSize="3.2rem"
                spacing="6"
                marginBottom="8"
              >
                <Link pointerEvents="none" as="span">
                  <Icon as={SiOpenai} />
                </Link>
                <Link pointerEvents="none" as="span">
                  <Icon as={SiMongodb} />
                </Link>
                <Link pointerEvents="none" as="span">
                  <Icon as={SiElastic} />
                </Link>
                <Link pointerEvents="none" as="span">
                  <Icon as={SiAmazonaws} />
                </Link>
              </Stack>

              {/* Projects Section */}
              <Badge
                as="a"
                variant="outline"
                marginBottom="5"
                fontSize="1.2rem"
                fontFamily="mono"
              >
                Projects
              </Badge>
              <Stack as={Box} marginY="5" spacing="5" marginBottom="8">
                <Text
                  fontWeight={300}
                  fontFamily="mono"
                  fontSize={{ md: 'large' }}
                  marginX="1"
                  boxSizing="content-box"
                >
                  <Link
                    href="https://github.com/VinayakDubey07/Decentralised-Image-Sharing-And-Storing-System"
                    isExternal
                  >
                    Decentralized Image Storing and Sharing System
                  </Link>
                </Text>
                <Text
                  fontWeight={300}
                  fontFamily="mono"
                  fontSize={{ md: 'large' }}
                  marginX="1"
                  boxSizing="content-box"
                >
                  <Link href="https://shortthebig.netlify.app/" isExternal>
                    Article Summarizer
                  </Link>
                </Text>
                <Text
                  fontWeight={300}
                  fontFamily="mono"
                  fontSize={{ md: 'large' }}
                  marginX="1"
                  boxSizing="content-box"
                >
                  <Link
                    href="https://github.com/VinayakDubey07/Chat-app-Blockchain"
                    isExternal
                  >
                    Multichat application using Blockchain and Gunjs
                  </Link>
                </Text>
              </Stack>
 {/* Algorithms Section */}
              <Badge
                as="a"
                variant="outline"
                marginBottom="5"
                fontSize="1.2rem"
                fontFamily="mono"
              >
                Algorithms
              </Badge>
              <Stack as={Box} marginY="5" spacing="5" marginBottom="8">
                <Text
                  fontWeight={300}
                  fontFamily="mono"
                  fontSize={{ md: 'large' }}
                  marginX="1"
                  boxSizing="content-box"
                >
                  <Link
                    href="https://github.com/VinayakDubey07/splitwise-algorithm"
                    isExternal
                  >
                    SplitWise Algorithm
                  </Link>
                </Text>
                <Text
                  fontWeight={300}
                  fontFamily="mono"
                  fontSize={{ md: 'large' }}
                  marginX="1"
                  boxSizing="content-box"
                >
                  <Link href="https://github.com/VinayakDubey07/File-zipper/tree/main" isExternal>
                    File Zipper using Huffman Encoding
                  </Link>
                </Text>
                
              </Stack>
              {/* On the web Section */}
              <Badge
                as="a"
                variant="outline"
                marginBottom="5"
                fontSize="1.2rem"
                fontFamily="mono"
              >
                On the web
              </Badge>
              <Stack as={Box} marginY="5" spacing="5" marginBottom="6">
                <Text
                  fontWeight={300}
                  fontFamily="mono"
                  fontSize={{ md: 'large' }}
                  marginX="1"
                  boxSizing="content-box"
                >
                  <Link href="https://github.com/VinayakDubey07" isExternal>
                    <Icon as={FiGithub} /> @Github
                  </Link>
                </Text>
                <Text
                  fontWeight={300}
                  fontFamily="mono"
                  fontSize={{ md: 'large' }}
                  marginX="1"
                  boxSizing="content-box"
                >
                  <Link href="https://linkedin.com/in/vinayaksde" isExternal>
                    <Icon as={FiLinkedin} /> @LinkedIn
                  </Link>
                </Text>
                <Text
                  fontWeight={300}
                  fontFamily="mono"
                  fontSize={{ md: 'large' }}
                  marginX="1"
                  boxSizing="content-box"
                >
                  <Link href="https://medium.com/@vinayakdubey.is20" isExternal>
                    <Icon as={SiMedium} /> @Medium
                  </Link>
                </Text>
              </Stack>

              {/* Contact Section */}
              <Text marginTop="6" fontFamily="mono">
                Get in touch <span>👉</span>{' '}
                <a className="mail" href="mailto:vinayak.d.dubey@oracle.com">
                  vinayak@oracle.com
                </a>
              </Text>
            </Box>
          </Stack>
        </Container>
      </Flex>
    </>
  )
}