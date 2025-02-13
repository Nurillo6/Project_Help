import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import CrudCaption from '../../../components/CrudCaption'
import { useNavigate, useParams } from 'react-router-dom'
import FilterCustom from "../../../components/FilterCustom"
import { Input } from 'antd'
import { Create, Edit } from '../../../service/auth'
import getRequest from '../../../service/getRequest'
const StudentsCrud = () => {
    const {id} = useParams()
    // Update
    const updateData = id && getRequest(`/students/${id}`) 
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const [studentId, setStudentId] = useState(null)
    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [groupId, setGroupId] = useState(null)
    const [group, setGroup] = useState(null)
    const [stackId, setStackId] = useState(null)
    const [age, setAge] = useState(null)
    const [regionId, setRegionId] = useState(null)
    const [region, setRegion] = useState(null)
    const [district, setDistrict] = useState(null)
    const [study, setStudy] = useState(null)
    const [phone, setPhone] = useState("+998")
    const [email, setEmail] = useState(null)

    function handleAddStudent(e){
        setIsLoading(true)
        e.preventDefault()
        const data = {studentId,name,groupId,group,stackId,surname,age,region,regionId,district,study,phone,email,status: true}
        if(id){
            data.id = id
            Edit(data, `/students/${id}`, setIsLoading, navigate, toast)
          }
          else{
            Create(data, "/students", setIsLoading, navigate, toast)
          }
    }

    useEffect(() => {
        if(updateData){
            setStudentId(updateData.studentId)
            setName(updateData.name)
            setSurname(updateData.surname)
            setGroup(updateData.group)
            setGroupId(updateData.groupId)
            setStackId(updateData.stackId)
            setAge(updateData.age)
            setRegion(updateData.region)
            setRegionId(updateData.regionId)
            setDistrict(updateData.district)
            setStudy(updateData.study)
            setPhone(updateData.phone)
            setEmail(updateData.email)
        }
    },[updateData])
    return (
        <form onSubmit={handleAddStudent} autoComplete='off' className='p-5'>
            <Toaster position="top-center" reverseOrder={false} />
            <CrudCaption id={id} isLoading={isLoading} title={`O'quvchi ${id ? "tahrirlash" : "qo'shish"}`} />
            <div className='flex justify-evenly mt-10'>
                <div className='w-[40%] flex flex-col gap-3'>
                    <Input value={studentId} onChange={(e) => setStudentId(e.target.value)} allowClear required size='large' placeholder='ID yarating' />
                    <Input value={name} onChange={(e) => setName(e.target.value)} allowClear required size='large' placeholder='Ism kiriting' />
                    <Input value={surname} onChange={(e) => setSurname(e.target.value)} allowClear required size='large' placeholder='Familiya kiriting' />
                    <Input type='number' value={age} onChange={(e) => setAge(e.target.value)} allowClear required size='large' placeholder='Yosh kiriting' />
                    <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} allowClear required size='large' placeholder="Email kiriting" />
                    <Input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} allowClear required size='large' placeholder="Telefon raqam kiriting" />
                </div>
                <div className='w-[40%] flex flex-col gap-3'>
                    <FilterCustom API={"/stack"} filterId={stackId} setFilterId={setStackId} placeholder={"Yo'nalish tanlang"} extraClass={'!w-full'} />
                    <FilterCustom  refresh={stackId} API={`/groups?stackId=${stackId}`} filterId={groupId} setFilterName={setGroup} setFilterId={setGroupId} placeholder={'Gurux tanlang'} extraClass={'!w-full'} />
                    <FilterCustom API={"/regions"} filterId={regionId} setFilterName={setRegion} setFilterId={setRegionId} placeholder={'Viloyat tanlang'} extraClass={'!w-full'} />
                    <Input value={district} onChange={(e) => setDistrict(e.target.value)} allowClear required size='large' placeholder='Tuman kiriting' />
                    <Input value={study} onChange={(e) => setStudy(e.target.value)} allowClear required size='large' placeholder="O'qish joyi" />
                </div>
            </div>
        </form>
    )
}

export default StudentsCrud