import { useHistory } from "react-router-dom";
import { ButtonClosed, TitleForm, TitleP } from "../FormAnuncio/styles"
import { ModalBackground, ModalDiv } from "./styles"

interface IProps {
    handleOpen: Function
}

const ModalSuccessPostCar = ({ handleOpen }: IProps) => {
    const history = useHistory();

    const Home = () => {
        history.push("/");
    };

    return(
        <ModalBackground title="modalBackgroundDiv" onClick={(e) => {handleOpen(e)}}>
            <ModalDiv>
                <div className="divRow">
                    <h3 className="title">Sucesso</h3><ButtonClosed title="closed" onClick={(e) => {handleOpen(e)}}>X</ButtonClosed>
                </div>
                <TitleForm className="subtitle">Seu anúncio foi criado com sucesso!</TitleForm>
                <span>Agora você podera ver seus negócios crescendo em grande escala</span>
                <button className="goToLoginBtn" onClick={Home} >Anuncios</button>
            </ModalDiv>
        </ModalBackground>
    )
}


export default ModalSuccessPostCar
