import { hover } from '@testing-library/user-event/dist/hover';
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios';

import '../Dropzone/Dropzone.css'

const Dropzone = () => {

  const [fileData, setFileData] = useState("")

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {

        setFileData(reader.result)
      }
      reader.readAsDataURL(file);

    })

  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })


  return (
    <>
      <div className='dropzoneContainer'>


        <div {...getRootProps()}>
          <input {...getInputProps()} />

          <p>Drop your meme image or gif here ...</p>


        </div>
      </div>
    </>
  )

}

export default Dropzone;