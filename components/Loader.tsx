import React from 'react'
import { DNA } from 'react-loader-spinner'
interface LoaderProps {
  style?: string;
}
const Loader:React.FC<LoaderProps> = ({style}) => {
  return (
    <div className={`w-full flex justify-center ${style}`}>
        <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        />
    </div>
  )
}

export default Loader