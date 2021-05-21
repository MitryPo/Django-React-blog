import React, { useState, useEffect } from 'react'
import {axiosInstance} from '../../axios'


export default function Categories() {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    axiosInstance
      .get('categories/')
      .then((res) => {
        setCategories(res.data)
      })
  }, [])

  return (categories)
}
