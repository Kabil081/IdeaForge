const Profile = () => {
  
  return (
    <div className="flex h-screen w-full justify-center items-center bg-gradient-to-r from-blue-500 to-green-500">
      <div className="flex flex-col gap-6 bg-white p-[40px] rounded-[15px]">
        <h1 className="text-center text-3xl pb-3 font-bold text-indigo-700"  >Details to enter</h1>
        <input className="px-4 py-2 w-96 rounded-sm outline-none border-gray-600 border-[1px]" type="text" placeholder="Enter your name"></input>
        <input className="px-4 py-2 w-96 rounded-sm outline-none border-gray-600 border-[1px]" type="number" placeholder="Enter your age"></input>
        <input className="px-4 py-2 w-96 rounded-sm outline-none border-gray-600 border-[1px]" type="number" placeholder="Enter your income"/>
        <input className="px-4 py-2 w-96 rounded-sm outline-none border-gray-600 border-[1px]" type="number" placeholder="Enter your savings"/>
        <input className="px-4 py-2 w-96 rounded-sm outline-none border-gray-600 border-[1px]" type="number" placeholder="Enter retirement age"/>
        <input className="px-4 py-2 w-96 rounded-sm outline-none border-gray-600 border-[1px]" type="number" placeholder="Enter retirement savings"/>
        <input className="px-4 py-2 w-96 rounded-sm outline-none border-gray-600 border-[1px]" type="number" placeholder="Enter risk tolerance (0-5)"/>
        <div className="flex justify-center w-full">
          <button className="bg-blue-500 font-semibold text-lg text-white px-[15px] py-[7px] rounded-[8px] w-[40%] hover:scale-[1.15] transition duration-300 active:scale-[1]">Submit</button>
        </div>
      </div>
    </div>
  )
}
export default Profile;