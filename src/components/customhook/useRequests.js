import {useState, useCallback} from  'react'

const useRequests = arg => {
     const [data, setData] = useState([]) 

    const sendRequest = useCallback(async (endPoint) => {
        try {
      const response = await fetch(endPoint);

      if (!response.ok){
          throw new Error('something failed')
      }
      const dataPoints = await response.json();
      setData(dataPoints);
        }catch(err){
          console.log(err)
        }
   }, [])

   return { data, sendRequest }
}


export default useRequests;