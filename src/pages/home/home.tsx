import Footer from "../../components/Footer";
import Header from "../../components/header";
import CardFixo from "../../components/CardFixo";
import Main from "./styles";
import { CardsList } from "../../components/renderCards";
import { DivSpace } from "../../styles";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/user";
import api from "../../api";
import jwtDecode from "jwt-decode";

const Home = () => {
  const { setUser, setToken, token, user } = useContext<any>(UserContext);

  useEffect(() => {
    let tokenExists = false

    token !== "" && (tokenExists = true)

    const decoded:any = tokenExists && (jwtDecode(token))
    
    token !== "" && api.get(`/users/${decoded.user_id}`).then((res) => {setUser(res.data)}).catch((err) => {console.log(err)})

  }, [])

  return (
    <Main>
      <Header type="anonymous" />
      <div className="pageContent">
        <CardFixo type="home" />
        <DivSpace height='120px' />
        <CardsList />
      </div>
      
      <Footer />
    </Main>
  );
};

export default Home;
