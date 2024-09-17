import LoadingSVG from "@/public/Infinity.svg" 
import Image from 'next/image'

const Loading = () => {
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <Image
      src={LoadingSVG}
      width={400}
      height={300}
      />
      <h1>loading..........................</h1>
    </div>
  )
}

export default Loading;
