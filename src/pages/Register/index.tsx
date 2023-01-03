import Footer from "../../components/Footer";
import Header from "../../components/header";
import {
  InputButton,
  InputPattern,
  LabelForm,
  TitleForm,
  TitleP,
} from "../../components/FormAnuncio/styles";
import Main, {
  CreateAccountButton,
  StyledRegisterForm,
  StyledRegisterSection,
} from "./styles";
import { useForm } from "react-hook-form";
import API from "../../api";
import { useState } from "react";
import ModalSuccessRegister from "../../components/ModalSuccessRegister";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const [openModalSuccess, setOpenModalSuccess] = useState(false)

    const handleOpen = (e: any) => {
        if (e.target.title === "modalBackgroundDiv" || e.target.title === "closed" || e.requestSuccess === true){
            setOpenModalSuccess(!openModalSuccess)
        }
    }

    const requestSuccessOpen = () => {
        setOpenModalSuccess(!openModalSuccess)
    }

    const onSubmit = (data: any) => {
        if (data.complement === "") {
            data.complement = "sem complemento"
        }


    if (data.bio === "") {
      data.bio = `Olá, me chamo ${data.name}`;
    }

    data.address = {
      cep: data.cep,
      city: data.city,
      state: data.state,
      street: data.street,
      district: "excluir",
      number: data.number,
      complement: data.complement,
    };

    delete data.cep;
    delete data.city;
    delete data.state;
    delete data.number;
    delete data.complement;
    delete data.street;

    data.isAdm = false;
    
    data.birthdate = data.birthdate.split("/").reverse().join("-");

    API.post("/users", data)
    .then((res) => {
          requestSuccessOpen()
    })
    .catch((err) => {console.log(err)})
    };

    return (
        <Main>
            <Header type="anonymous" />
            {openModalSuccess ? <ModalSuccessRegister handleOpen={handleOpen} /> : ""}
            <StyledRegisterSection>
                <StyledRegisterForm onSubmit={handleSubmit(onSubmit)} >
                    <TitleForm>Cadastro</TitleForm>
                    <TitleP>Informações pessoais</TitleP>
                    <LabelForm htmlFor="">Nome</LabelForm>
                    <InputPattern type="text" placeholder="Ex: Manoel Gomes" {...register("name", {required: true})} />
                    <LabelForm htmlFor="">Email</LabelForm>
                    <InputPattern type="text" placeholder="Ex: manoelgomes@gmail.com" {...register("email", {required: true})} />
                    <LabelForm htmlFor="">CPF</LabelForm>
                    <InputPattern type="text" placeholder="000.000.000-00" {...register("cpf", {required: true})} />
                    <LabelForm htmlFor="">Telefone</LabelForm>
                    <InputPattern type="text" placeholder="(DDD) 90000-0000" {...register("phone", {required: true})} />
                    <LabelForm htmlFor="">Data de Nascimento</LabelForm>
                    <InputPattern type="text" placeholder="00/00/0000" {...register("birthdate", {required: true})} />
                    <LabelForm htmlFor="">Descrição</LabelForm>
                    <InputPattern type="text" placeholder="Conte um pouco sobre você em poucas palavras" {...register("bio", {required: false})} />
                    <TitleP>Informações de endereço</TitleP>
                    <LabelForm htmlFor="">CEP</LabelForm>
                    <InputPattern type="text" placeholder="00000.000" {...register("cep", {required: true})} />
                    <div className="rowDiv">
                        <div className="columnDiv">
                            <LabelForm htmlFor="">Estado</LabelForm>
                            <InputPattern type="text" placeholder="Ex: PR" {...register("state", {required: true})} />
                        </div>
                        <div className="columnDiv">
                            <LabelForm htmlFor="">Cidade</LabelForm>
                            <InputPattern type="text" placeholder="Ex: Londrina" {...register("city", {required: true})} />
                        </div>
                    </div>
                    <LabelForm htmlFor="">Rua</LabelForm>
                    <InputPattern type="text" placeholder="Rua das flores" {...register("street", {required: true})} />
                    <div className="rowDiv">
                        <div className="columnDiv">
                            <LabelForm htmlFor="">Número</LabelForm>
                            <InputPattern type="text" placeholder="Ex: 101" {...register("number", {required: true})} />
                        </div>
                        <div className="columnDiv">
                            <LabelForm htmlFor="">Complemento</LabelForm>
                            <InputPattern type="text" placeholder="complemento" {...register("complement", {required: false})} />
                        </div>
                    </div>
                    <TitleP>Tipo de conta</TitleP>
                    <div className="rowDiv">
                        <InputButton type="button" value={'Comprador'}/>
                        <InputButton  type="button" value={'Anunciante'} color='color'/> 
                    </div>
                    <LabelForm htmlFor="">Senha</LabelForm>
                    <InputPattern type="text" placeholder="Digitar Senha" {...register("password", {required: true})} />
                    <LabelForm htmlFor="">Confirmar Senha</LabelForm>
                    <InputPattern type="text" placeholder="Digitar Senha" />
                    <CreateAccountButton type="submit" >Finalizar cadastro</CreateAccountButton>
                </StyledRegisterForm>
            </StyledRegisterSection>
            <Footer />
        </Main>
    )
}

export default Register;