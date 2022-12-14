import React, {useState}from 'react'
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
  } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [userName,setUserName] = useState("")
    const [password , setPassword] = useState("")
    const [ isAuth,setIsAuth] = useState(false)
    const navigate = useNavigate()

    
    const handleLogin=()=>{
        let Uname = JSON.parse(localStorage.getItem("userName"))
        let Pword = JSON.parse(localStorage.getItem("password"))
        if(Uname===userName&&Pword===password){
               localStorage.setItem("isAuth" , JSON.stringify(true))
               setIsAuth(true)
               navigate("/")
        }
        
        // console.log(Uname,Pword)
    }
  return (
    <div>
        
        <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Login
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>User Name</FormLabel>
          <Input
           onChange={(e)=>setUserName(e.target.value)}
            placeholder="your Username"
            _placeholder={{ color: 'gray.500' }}
            type="name"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
           
          <Input onChange={(e)=>setPassword(e.target.value)} type="password"   />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={()=>{
                handleLogin();

            }}  >
                <Link to={"/"}  >
                Login
                </Link>
            
          </Button>
          <p>If new here click on  <Link style={{textDecoration:"underline"}} to="/signup" >Sign-Up</Link></p>
        </Stack>
      </Stack>
    </Flex>
    
    
    </div>
  )
}

export default Login