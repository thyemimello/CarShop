import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import api from  "../../api";
import { UserContext } from "../../contexts/user";
import { FormPattern } from "../FormPadrão/styles";
import {
  TitleForm,
  FooterForm,
  ButtonFooter,
  InputPattern,
  HeaderForm,
  ButtonClosed,
  LabelForm,
  LabelButtonForm,
} from "./styles";
import ModalSuccessRegister from "../ModalSuccessRegister";
import {  toast } from 'react-toastify';

interface IProps {
  open: boolean
  setOpen: Function
}

const FormPerfil = ({ open, setOpen }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser, token, user } = useContext<any>(UserContext);


  const onSubmit = (data: any) => {
    data.birthdate = data.birthdate.split("/").reverse().join("-")

    api.patch(`/users/${user.id}`, data, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res) => {
      api.get(`/users/${user.id}`)
      .then((res) => {
        setUser(res.data)
        setOpen(!open)
        toast.success("Atulizado")
      })
    })
    .catch((err) => {
      console.log(err.response)
      toast.error("Algo deu errado")
    })
  }

  return (
    <FormPattern onSubmit={handleSubmit(onSubmit)}>
      <HeaderForm>
        <TitleForm>Editar Perfil</TitleForm>
        <ButtonClosed
          onClick={() => {
            setOpen(!open)
          }}
        >
          X
        </ButtonClosed>
      </HeaderForm>

      <LabelButtonForm htmlFor="">Informações pessoais</LabelButtonForm>

      <LabelForm htmlFor="">Nome</LabelForm>
      <InputPattern
        type="text"
        {...register("username", { required: true, value: user.name })}
      />

      <LabelForm htmlFor="">Email</LabelForm>
      <InputPattern type="text"
      {...register("email", { required: true, value: user.email })} 
      />

      <LabelForm htmlFor="">CPF</LabelForm>
      <InputPattern type="text" 
      {...register("cpf", { required: true, value: user.cpf })}
      />

      <LabelForm htmlFor="">Data de nascimento</LabelForm>
      <InputPattern type="date"
        {...register("birthdate", { required: true, value: user.birthdate?.split("-").reverse().join("/") })}
      />
      <FooterForm>
        <ButtonFooter color="color" type="button" onClick={() => {setOpen(!open)}}>Cancelar</ButtonFooter>
        <ButtonFooter type="submit">Salvar Alterações</ButtonFooter>
      </FooterForm>
    </FormPattern>
  );
};

export default FormPerfil;

