import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import s from "./Home.module.css"
import { Menu,MenuButton,MenuList ,MenuItem  } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { IsAuthState } from '../Atom';
import { FormControl,FormLabel,Switch } from '@chakra-ui/react';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react'




const Home = () => {
   const [data , setData] = useState([])
   const[nId ,setNId] = useState(0)
   const [newTitle,setNewTitle] = useState("")
   const [newDes, setNewDes] = useState("")
   const [newCategory,setNewCategory] = useState("")
   const [nPrice ,setNPrice ]   =useState("")
   const [search ,setSearch] = useState("")
   const [ischecked,setIschecked] = useState(false)


const getData = ()=>{
    axios.get('https://api.escuelajs.co/api/v1/products')
  .then(function (res) {
    // handle success
    setData([...res.data])
    // console.log(res.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

const updateData =() =>{
    let obj ={} 
    if(newTitle.length>0){
      obj["title"]=newTitle;
    }
    if(newDes.length>0){
      obj["description"] = newDes
    }
    if(newCategory.length>0){
      obj["category"]=newCategory
    }
    if(nPrice.length>0){
      obj["price"] = nPrice
    }
    console.log(obj)
    axios.put(`https://api.escuelajs.co/api/v1/products/${nId}`,obj)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    
    onClose()
    getData();
}

const searchData= () =>{
      if(search.length>0){
        const filteredData = data.filter((e)=>{

       if(e.title.toLowerCase().includes(search.toLowerCase())){
        console.log(e.title.toLowerCase())
        return e.title.toLowerCase()
       }
         



        })
        setData([...filteredData])
        // getData()
      }
}

const handleDelete = (id)=>{
    axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`)
    .then((res)=>{
        // console.log(res.data)
    })
getData();

}

const handleSort=(value)=>{
    if(ischecked){
        var sorted=  data.sort((a,b) =>b[value]-a[value]) 
    }else{
        var sorted=  data.sort((a,b) =>a[value]-b[value])
    }

  
    // console.log(value)
    // console.log(sorted)
    setData( [...sorted])
   
    // getData()
}
  
const handleSwitch =()=>{

    setIschecked(!ischecked)
    // console.log(ischecked)
}

useEffect(()=>{
      var isAuth=   JSON.parse(localStorage.getItem("isAuth"))

   getData()
//    console.log(isAuth)
},[])




  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
    <div className={s.toolbar}  >
        <div>
        <input onChange={(e)=>setSearch(e.target.value)}  className={s.search}  placeholder='Search The Data'  /> <Button onClick={searchData}  >Search</Button>
        </div>
       
        <Menu onChange={(e)=>handleSort(e.target.value)}  className={s.menu}  >
         <MenuButton width="200px"  backgroundColor="blue.300" >
          Select
         </MenuButton>
         <MenuList  >
          <MenuItem onClick={(e)=>handleSort(e.target.value)}  value={"id"} >Id</MenuItem>
          <MenuItem onClick={(e)=>handleSort(e.target.value)}  value={"title"} >Title</MenuItem>
          <MenuItem onClick={(e)=>handleSort(e.target.value)}  value={"price"} >Price</MenuItem>
          <MenuItem onClick={(e)=>handleSort(e.target.value)}  value={"description"} >Description</MenuItem>
          <MenuItem onClick={(e)=>handleSort(e.target.value)}  value={"category"} >Category Name</MenuItem>
         </MenuList>
        </Menu>
  
        <div>
         <FormControl display='flex' alignItems='center'>
         <FormLabel htmlFor='email-alerts' mb='0'>
          ASC
         </FormLabel>
          <Switch onChange={handleSwitch} id='email-alerts' />
          <FormLabel htmlFor='email-alerts' mb='0'>
          DSC
         </FormLabel>
         </FormControl>
         </div>

    </div>
   
   <div>
    <table className={s.table}  >
        <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category Name</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        
        {data.map((prod)=>
            <tr>
                <td>{prod.id}</td>
                <td>{prod.title}</td>
                <td>{prod.description} </td>
                <td>{prod.category.name }</td>
                <td>{prod.price}</td>
                <td><Button onClick={()=>{
                  onOpen();
                  setNId(prod.id)
                }}  >Edit</Button> </td>
                <td><Button onClick={()=>handleDelete(prod.id)}  >Delete</Button></td>
            </tr>
        )}
        
       
    </table>
    <>
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className={s.modal} >
                   
                    <input onChange={(e)=>setNewTitle(e.target.value)} placeholder='new Title' />
                    <input onChange={(e)=>setNewDes(e.target.value)} placeholder='new Description' />
                    <input onChange={(e)=>setNewCategory(e.target.value)}  placeholder='new Category' />
                    <input onChange={(e)=>setNPrice(e.target.value)}   placeholder='new Price' />

                     </ModalBody>
                     <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={updateData}>
                        Update
                        </Button>
                        
                    </ModalFooter>
                    </ModalContent>
                </Modal>
                </>
   </div>
    </div>
  )
}

export default Home