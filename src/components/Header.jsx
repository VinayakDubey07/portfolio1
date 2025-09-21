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
  Tooltip,
  ScaleFade,
  useDisclosure,
  Collapse,
  Button,
  VStack,
  HStack,
  keyframes,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import {
  FiGithub,
  FiLinkedin,
  FiDatabase,
  FiServer,
  FiLayers,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi'
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
  FaJenkins,
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

// Floating animation keyframe
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`

// Pulse animation for skills
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

// Skill icon component with hover effects
const SkillIcon = ({ icon, name, category }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Tooltip label={name} hasArrow placement="top" bg="gray.700" color="white">
      <Box
        as="span"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        cursor="pointer"
        transition="all 0.3s ease"
        transform={isHovered ? 'scale(1.2) rotate(5deg)' : 'scale(1)'}
        _hover={{
          color:
            category === 'languages'
              ? 'blue.400'
              : category === 'frameworks'
              ? 'green.400'
              : category === 'tools'
              ? 'purple.400'
              : category === 'libraries'
              ? 'orange.400'
              : category === 'ai'
              ? 'pink.400'
              : 'teal.400',
        }}
        animation={isHovered ? `${pulse} 0.6s ease-in-out` : 'none'}
      >
        <Icon as={icon} />
      </Box>
    </Tooltip>
  )
}

// Collapsible section component
const CollapsibleSection = ({ title, children, defaultOpen = false }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: defaultOpen })

  return (
    <Box marginBottom="6">
      <Button
        variant="ghost"
        onClick={onToggle}
        rightIcon={isOpen ? <FiChevronUp /> : <FiChevronDown />}
        fontFamily="mono"
        fontSize="1.2rem"
        marginBottom="3"
        _hover={{ bg: 'transparent', transform: 'translateX(10px)' }}
        transition="all 0.3s ease"
      >
        <Badge variant="outline" fontSize="1.2rem" fontFamily="mono">
          {title}
        </Badge>
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <ScaleFade initialScale={0.9} in={isOpen}>
          {children}
        </ScaleFade>
      </Collapse>
    </Box>
  )
}

// Typing effect component
const TypingEffect = ({ texts, speed = 100, pause = 2000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[currentTextIndex]

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1))
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentTextIndex(prev => (prev + 1) % texts.length)
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1))
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), pause)
          return
        }
      }
    }

    const timer = setTimeout(handleTyping, isDeleting ? speed / 2 : speed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentTextIndex, texts, speed, pause])

  return (
    <Text
      fontWeight={300}
      fontFamily="mono"
      fontSize={{ md: 'large' }}
      marginX="1"
      boxSizing="content-box"
      minHeight="1.5em"
    >
      <span className="highlighted-word">
        {currentText}
        <span
          style={{
            borderRight: '2px solid',
            animation: 'blink 1s infinite',
          }}
        >
          |
        </span>
      </span>
    </Text>
  )
}

export default function Header() {
  const [showContent, setShowContent] = useState(false)
  const [hoveredProject, setHoveredProject] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const typingTexts = [
    'Playing 4D Chess with AI',
    'Building the Future with Code',
    'Turning Coffee into Software',
    'Making Magic Happen with ML',
  ]

  const projects = [
    {
      name: 'Decentralized Image Storing and Sharing System',
      url: 'https://github.com/VinayakDubey07/Decentralised-Image-Sharing-And-Storing-System',
      description: 'Blockchain-based secure image storage and sharing platform',
    },
    {
      name: 'Article Summarizer',
      url: 'https://shortthebig.netlify.app/',
      description: 'AI-powered tool to summarize long articles instantly',
    },
    {
      name: 'Multichat application using Blockchain and Gunjs',
      url: 'https://github.com/VinayakDubey07/Chat-app-Blockchain',
      description: 'Decentralized chat application with blockchain security',
    },
  ]

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
            <ScaleFade initialScale={0.8} in={showContent}>
              <Box w="36" marginX="auto">
                <Img
                  borderRadius="full"
                  src="https://i.ibb.co/svMfvx1/avatar.png"
                  alt="Vinayak Avatar"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: 'scale(1.05)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                  }}
                  animation={`${float} 6s ease-in-out infinite`}
                />
              </Box>
            </ScaleFade>

            <ScaleFade initialScale={0.9} in={showContent}>
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
                transition="all 0.3s ease"
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                }}
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
            </ScaleFade>

            <Box alignItems="center">
              <Text
                fontWeight={500}
                fontSize={{ md: 'large' }}
                fontFamily="mono"
                marginX="1"
                boxSizing="content-box"
              >
                <span className="highlighted-word">
                  Software Developer @Oracle
                </span>
              </Text>
            </Box>

            <Box alignItems="center">
              <TypingEffect texts={typingTexts} />
            </Box>

            <Box justifyContent="center">
              {/* Languages Section */}
              <CollapsibleSection title="Languages" defaultOpen>
                <Stack
                  paddingX="14"
                  justify="center"
                  direction="row"
                  wrap="wrap"
                  fontSize="3.2rem"
                  spacing="6"
                  marginBottom="8"
                >
                  <SkillIcon
                    icon={SiCplusplus}
                    name="C++"
                    category="languages"
                  />
                  <SkillIcon
                    icon={SiPython}
                    name="Python"
                    category="languages"
                  />
                  <SkillIcon
                    icon={FaJs}
                    name="JavaScript"
                    category="languages"
                  />
                  <SkillIcon icon={FaHtml5} name="HTML5" category="languages" />
                  <SkillIcon icon={SiMysql} name="MySQL" category="languages" />
                </Stack>
              </CollapsibleSection>

              {/* Frameworks Section */}
              <CollapsibleSection title="Frameworks">
                <Stack
                  paddingX="14"
                  justify="center"
                  direction="row"
                  wrap="wrap"
                  fontSize="3.2rem"
                  spacing="6"
                  marginBottom="8"
                >
                  <SkillIcon icon={FaCss3} name="CSS3" category="frameworks" />
                  <SkillIcon
                    icon={SiBootstrap}
                    name="Bootstrap"
                    category="frameworks"
                  />
                  <SkillIcon
                    icon={FaNodeJs}
                    name="Node.js"
                    category="frameworks"
                  />
                  <SkillIcon
                    icon={SiNextdotjs}
                    name="Next.js"
                    category="frameworks"
                  />
                  <SkillIcon
                    icon={FaReact}
                    name="React"
                    category="frameworks"
                  />
                </Stack>
              </CollapsibleSection>

              {/* Developer Tools Section */}
              <CollapsibleSection title="Developer Tools">
                <Stack
                  paddingX="14"
                  justify="center"
                  direction="row"
                  wrap="wrap"
                  fontSize="3.2rem"
                  spacing="6"
                  marginBottom="8"
                >
                  <SkillIcon icon={FaGithub} name="GitHub" category="tools" />
                  <SkillIcon icon={FaUbuntu} name="Ubuntu" category="tools" />
                  <SkillIcon icon={FaGitlab} name="GitLab" category="tools" />
                  <SkillIcon icon={FaJenkins} name="Jenkins" category="tools" />
                  <SkillIcon icon={SiNetlify} name="Netlify" category="tools" />
                </Stack>
              </CollapsibleSection>

              {/* Libraries Section */}
              <CollapsibleSection title="Libraries">
                <Stack
                  paddingX="14"
                  justify="center"
                  direction="row"
                  wrap="wrap"
                  fontSize="3.2rem"
                  spacing="6"
                  marginBottom="8"
                >
                  <SkillIcon
                    icon={SiTensorflow}
                    name="TensorFlow"
                    category="libraries"
                  />
                  <SkillIcon icon={SiKeras} name="Keras" category="libraries" />
                  <SkillIcon
                    icon={SiPandas}
                    name="Pandas"
                    category="libraries"
                  />
                  <SkillIcon icon={SiNumpy} name="NumPy" category="libraries" />
                  <SkillIcon
                    icon={SiScikitlearn}
                    name="Scikit-learn"
                    category="libraries"
                  />
                </Stack>
              </CollapsibleSection>

              {/* AI/ML Skills Section */}
              <CollapsibleSection title="AI/ML Skills">
                <Stack
                  paddingX="14"
                  justify="center"
                  direction="row"
                  wrap="wrap"
                  fontSize="3.2rem"
                  spacing="6"
                  marginBottom="8"
                >
                  <SkillIcon icon={SiOpenai} name="OpenAI" category="ai" />
                  <SkillIcon icon={SiMongodb} name="MongoDB" category="ai" />
                  <SkillIcon
                    icon={SiElastic}
                    name="Elasticsearch"
                    category="ai"
                  />
                  <SkillIcon icon={SiAmazonaws} name="AWS" category="ai" />
                </Stack>
              </CollapsibleSection>

              {/* Projects Section */}
              <CollapsibleSection title="Projects">
                <VStack spacing="4" marginBottom="8">
                  {projects.map((project, index) => (
                    <Box
                      key={index}
                      onMouseEnter={() => setHoveredProject(index)}
                      onMouseLeave={() => setHoveredProject(null)}
                      transition="all 0.3s ease"
                      transform={
                        hoveredProject === index
                          ? 'translateX(10px)'
                          : 'translateX(0)'
                      }
                      width="100%"
                      padding="3"
                      borderRadius="md"
                      _hover={{
                        bg: useColorModeValue('gray.50', 'whiteAlpha.50'),
                      }}
                    >
                      <Text
                        fontWeight={300}
                        fontFamily="mono"
                        fontSize={{ md: 'large' }}
                        marginX="1"
                        boxSizing="content-box"
                      >
                        <Link href={project.url} isExternal>
                          {project.name}
                        </Link>
                      </Text>
                      <Collapse in={hoveredProject === index} animateOpacity>
                        <Text
                          fontSize="sm"
                          color={useColorModeValue('gray.600', 'gray.400')}
                          fontFamily="mono"
                          marginTop="2"
                          marginX="1"
                        >
                          {project.description}
                        </Text>
                      </Collapse>
                    </Box>
                  ))}
                </VStack>
              </CollapsibleSection>

              {/* Algorithms Section */}
              <CollapsibleSection title="Algorithms">
                <Stack as={Box} marginY="5" spacing="5" marginBottom="8">
                  <Text
                    fontWeight={300}
                    fontFamily="mono"
                    fontSize={{ md: 'large' }}
                    marginX="1"
                    boxSizing="content-box"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'translateX(10px)',
                      color: 'blue.400',
                    }}
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
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'translateX(10px)',
                      color: 'blue.400',
                    }}
                  >
                    <Link
                      href="https://github.com/VinayakDubey07/File-zipper/tree/main"
                      isExternal
                    >
                      File Zipper using Huffman Encoding
                    </Link>
                  </Text>
                </Stack>
              </CollapsibleSection>

              {/* On the web Section */}
              <CollapsibleSection title="On the web">
                <HStack spacing="8" justify="center" marginBottom="6">
                  <Link
                    href="https://github.com/VinayakDubey07"
                    isExternal
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'translateY(-5px) scale(1.1)',
                      color: 'gray.600',
                    }}
                  >
                    <VStack>
                      <Icon as={FiGithub} fontSize="2xl" />
                      <Text fontSize="sm" fontFamily="mono">
                        GitHub
                      </Text>
                    </VStack>
                  </Link>
                  <Link
                    href="https://linkedin.com/in/vinayaksde"
                    isExternal
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'translateY(-5px) scale(1.1)',
                      color: 'blue.600',
                    }}
                  >
                    <VStack>
                      <Icon as={FiLinkedin} fontSize="2xl" />
                      <Text fontSize="sm" fontFamily="mono">
                        LinkedIn
                      </Text>
                    </VStack>
                  </Link>
                  <Link
                    href="https://medium.com/@vinayakdubey.is20"
                    isExternal
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'translateY(-5px) scale(1.1)',
                      color: 'green.600',
                    }}
                  >
                    <VStack>
                      <Icon as={SiMedium} fontSize="2xl" />
                      <Text fontSize="sm" fontFamily="mono">
                        Medium
                      </Text>
                    </VStack>
                  </Link>
                </HStack>
              </CollapsibleSection>

              {/* Contact Section */}
              <Box
                textAlign="center"
                padding="6"
                borderRadius="lg"
                background={useColorModeValue('gray.50', 'whiteAlpha.50')}
                transition="all 0.3s ease"
                _hover={{
                  transform: 'translateY(-3px)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                }}
              >
                <Text marginTop="6" fontFamily="mono">
                  Get in touch <span>👉</span>{' '}
                  <a
                    className="mail"
                    href="mailto:vinayak.d.dubey@oracle.com"
                    style={{
                      transition: 'all 0.3s ease',
                      textDecoration: 'underline',
                      textDecorationColor: 'transparent',
                    }}
                    onMouseEnter={e => {
                      e.target.style.textDecorationColor = 'currentColor'
                      e.target.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => {
                      e.target.style.textDecorationColor = 'transparent'
                      e.target.style.transform = 'translateY(0)'
                    }}
                  >
                    vinayak@oracle.com
                  </a>
                </Text>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Flex>

      <style jsx>{`
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
