import Footer from "../../components/Footer";
import Header from "../../components/header";
import {
  InputPattern,
  LabelForm,
  TitleForm,
  TitleP,
} from "../../components/FormAnuncio/styles";
import Main, {
  BuyerBtn,
  CreateAccountButton,
  StyledRegisterForm,
  StyledRegisterSection,
} from "./styles";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import api from "../../api";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user";
import ModalSuccessPostCar from "../../components/ModalSuccessPostCar";

const PostCar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [isAdvertiser, setIsAdvertiser] = useState(false);
  const { setUser, setToken, token, user } = useContext<any>(UserContext);
  const history = useHistory();

  const handleOpen = (e: any) => {
    if (
      e.target.title === "modalBackgroundDiv" ||
      e.target.title === "closed" ||
      e.requestSuccess === true
    ) {
      setOpenModalSuccess(!openModalSuccess);
    }
  };

  const requestSuccessOpen = () => {
    setOpenModalSuccess(!openModalSuccess);
  };

  const send = async (data: any) => {
    data.images = [
      {
        imageUrl: data.imageUrl1,
        type: "COVER"
      },
      {
        imageUrl: data.imageUrl3,
        type: "OTHER" },
      {
        imageUrl: data.imageUrl2,
        type: "OTHER"
},
    ]
    delete data.imageUrl1;
    delete data.imageUrl2;
    delete data.imageUrl3;
    try {
      const res = await api.post("/advertisements/", data, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      requestSuccessOpen();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Main>
      <Header type="anonymous" />
      {openModalSuccess ? <ModalSuccessPostCar handleOpen={handleOpen} /> : ""}
      <StyledRegisterSection>
        <StyledRegisterForm onSubmit={handleSubmit(send)}>
          <TitleForm>Cadastro</TitleForm>
          <TitleP>Informações pessoais</TitleP>
          <LabelForm htmlFor="">Nome</LabelForm>
          <InputPattern
            type="text"
            placeholder="Ex: Manoel Gomes"
            {...register("username", { required: true })}
          />
          <LabelForm htmlFor="">Modelo</LabelForm>
          <InputPattern
            type="text"
            placeholder="Ex:Corola Toyota"
            {...register("title", { required: true })}
          />
          <LabelForm htmlFor="">Ano</LabelForm>
          <InputPattern
            type="text"
            placeholder="0000"
            {...register("year", { required: true })}
          />
          <LabelForm htmlFor="">KM</LabelForm>
          <InputPattern
            type="text"
            placeholder="0000Km"
            {...register("Km", { required: true })}
          />
          <LabelForm htmlFor="">Imagem Principal</LabelForm>
          <InputPattern
            type="text"
            placeholder="www.imageVeículo.com.br"
            {...register("imageUrl1", { required: true })}
          />
          <LabelForm htmlFor="">URL da Imagem</LabelForm>
          <InputPattern
            type="text"
            placeholder="www.imageVeículo.com.br"
            {...register("imageUrl2", { required: true })}
          />
          <LabelForm htmlFor="">URL da Imagem</LabelForm>
          <InputPattern
            type="text"
            placeholder="www.imageVeículo.com.br"
            {...register("imageUrl3", { required: true })}
          />
          <TitleP>Tipo de Veículo</TitleP>
          <div className="rowDiv">
            {isAdvertiser ? (
              <>
                <BuyerBtn
                  type="button"
                  value={"Carro"}
                  color="color"
                  onClick={() => {
                    setIsAdvertiser(false);
                  }}
                />
                <BuyerBtn
                  type="button"
                  value={"Moto"}
                  onClick={() => {
                    setIsAdvertiser(true);
                  }}
                />
              </>
            ) : (
              <>
                <BuyerBtn
                  type="button"
                  value={"Carro"}
                  onClick={() => {
                    setIsAdvertiser(false);
                  }}
                />
                <BuyerBtn
                  type="button"
                  value={"Moto"}
                  color="color"
                  onClick={() => {
                    setIsAdvertiser(true);
                  }}
                />
              </>
            )}
          </div>
          <LabelForm htmlFor="">Descrição</LabelForm>
          <InputPattern
            type="text"
            placeholder="Ex: Unico Dono"
            {...register("description", { required: true })}
          />
          <div className="rowDiv">
            <div className="columnDiv">
              <LabelForm htmlFor="">Valor</LabelForm>
              <InputPattern
                type="text"
                placeholder="Ex: R$50.000,00"
                {...register("price", { required: true })}
              />
            </div>
            
          </div>
          
          <CreateAccountButton type="submit">
            Finalizar cadastro
          </CreateAccountButton>
        </StyledRegisterForm>
      </StyledRegisterSection>
      <Footer />
    </Main>
  );
};

export default PostCar;
