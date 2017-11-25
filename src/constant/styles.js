const styles=(data)=>{
    container:{
         margin: '80px 20px 20px 15px',
        paddingLeft: data.navDrawerOpen && data.width !== SMALL ? data.paddingLeftDrawerOpen : 0
    }
}