import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, PhoneFilled } from '@ant-design/icons'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import getRequest from '../../../service/getRequest'
import { Button, Modal } from 'antd'
import MoreItem from "../../../components/MoreItem"
import { deleteUser } from '../../../service/delete'

const StudentMore = () => {
  const {id} = useParams() 
  const singleData = getRequest(`/students/${id}`)
  const [deleteModal,setDeleteModal] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const navigate = useNavigate()

  function handleRemoveStudent(){
    setDeleteLoading(true)
    deleteUser(`/students/${id}`, setDeleteLoading, setDeleteModal, navigate, toast)
  }
  return (
    <div className='p-5'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <button className='cursor-pointer' type='button' onClick={() => navigate(-1)}> <ArrowLeftOutlined className='text-[25px]' /> </button>
          <h2 className='font-bold text-[25px]'>{singleData?.name} {singleData.surname} | #{singleData.studentId}</h2>
        </div>
        <div className='flex items-center gap-[10px]'>
          <Link to={`tel:${singleData.phone}`}>
            <Button className='!bg-green-500' type='primary' size='large'>
              <PhoneFilled className='text-[22px]' />
            </Button>
          </Link>
          <Button onClick={() => setDeleteModal(true)} className='!bg-red-700' type='primary' size='large'> <DeleteOutlined className='text-[22px]' /> </Button>
          <Button onClick={() => navigate(`edit`)} type='primary' size='large' icon={<EditOutlined className='text-[20px]' />}>Tahrirlash</Button>
        </div>
      </div>
      <div className='flex justify-between mt-10'>
        <ul className='p-5 space-y-2 rounded-md border-[2px] border-slate-400 w-[45%]'>
          <MoreItem title={'ID'} value={singleData.studentId} />
          <MoreItem title={'Ismi'} value={singleData.name} />
          <MoreItem title={'Familiya'} value={singleData.surname} />
          <MoreItem title={'Yoshi'} value={singleData.age} />
          <MoreItem title={'Email'} value={singleData.email} />
          <MoreItem title={'Telefon raqam'} value={singleData.phone} />
        </ul>
        <ul className='p-5 space-y-2 rounded-md border-[2px] border-slate-400 w-[45%]'>
          <MoreItem title={'Gurux nomi'} value={singleData.group} />
          <MoreItem title={'Viloyat'} value={singleData.region} />
          <MoreItem title={'Tuman'} value={singleData.district} />
          <MoreItem title={"O'qish nomi"} value={singleData.study} />
          <MoreItem title={"Holati"} value={singleData.status ? "Active" : "Active emas"} />
        </ul>
      </div>
      <Modal confirmLoading={deleteLoading} open={deleteModal} onCancel={() => setDeleteModal(false)} onOk={handleRemoveStudent} title="O'quvchini o'chirmoqchimisiz"> </Modal>
    </div>
  )
}

export default StudentMore