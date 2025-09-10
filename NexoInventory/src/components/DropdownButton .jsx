function DropdownButton({label}) {
    return (
        <div>
            <button className="
            flex                 
            items-center         
            justify-between       
            w-48                 
            bg-gray-700           
            border                
            border-gray-600       
            text-white          
            rounded-lg           
            py-2                 
            px-4                 
            hover:bg-gray-600    
            focus:outline-none    
            ">
                {label}
            </button>
        </div>
    );
}

export default DropdownButton;