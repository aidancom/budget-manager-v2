
import { Button } from 'primereact/button';
import useAppStore from '../stores/useAppStore';

const Header = () => {

  return (
    <header 
      className='flex justify-end gap-3 p-3 relative z-999'
    >
      <Button 
        label='Entrar'
        className="bg-blue-500 transition text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600"
        onClick={() => useAppStore.setState({auth: 'login'})}
        />
      <Button 
        label='Registrarse'
        className="bg-blue-500 transition text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600"
        onClick={() => useAppStore.setState({auth: 'register'})}
        />
    </header>
  )
}

export default Header
