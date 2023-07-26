import Button from "../Button";
import { CardComments } from "../CardComments";
import {
  Box,
  BoxAnuncio,
  BoxCarro,
  BoxDescrição,
  BoxInfo,
  BoxImgUl,
  BoxFotos,
  BoxPerfil,
  BoxComments,
  ListComments,
} from "./styles";
import api from "../../api";
import { useEffect, useState, useContext, useRef } from "react";
import { useHistory, useParams } from "react-router";
import CommentAnnouncement from "../ComentAnnouncement";
import { UserContext } from "../../contexts/user";
import { NoAnnouncement } from "../NoContent";
interface IImage {
  id: string;
  imageUrl: string;
  type: string;
}

const CardAnnouncement = () => {
  const [reloadPage, setReloadPage]= useState(false)
  const [announcementDetail, setAnnouncementDetail] = useState<any>({});
  const {
    setUser,
    setToken,
    token,
    user,
    userProfileView,
    setUserProfileView,
    setUserProfileViewId
  } = useContext<any>(UserContext);

  const ref = useRef<any>(null);
  const { id }: any = useParams();
  const history = useHistory();

  useEffect(() => {
    api.get(`/announcements/${id}`)
      .then((resp) => {
        setAnnouncementDetail(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadPage]);

  const goToUserAnnouncement = () => {
    api.get(`/users/${announcementDetail.user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res)
        setUserProfileViewId(res.data.id);
        setUserProfileView(res.data)

        return history.push(`/profile/${announcementDetail.user.id}`);
      })
      .catch((err) => console.log(err));
  };

  if (announcementDetail.title) {
    return (
      <Box>
        <BoxAnuncio>
          <div>
            <BoxCarro>
              <div>
                <img
                  src={announcementDetail.images[0].imageUrl}
                  alt="Imagem Principal do Veículo"
                />
              </div>
            </BoxCarro>
            <BoxInfo>
              <h1>{announcementDetail.title}</h1>
              <div>
                <div>
                  <p>{announcementDetail.year}</p>
                  <p>{announcementDetail.km}km</p>
                </div>
                <span>R$ {announcementDetail.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                })}</span>
              </div>
              <Button>Comprar</Button>
            </BoxInfo>
            <BoxDescrição>
              <h3>Descrição</h3>
              <p>{announcementDetail.description}</p>
            </BoxDescrição>
          </div>
          <div>
            <BoxFotos>
              <h3>Fotos</h3>
              <BoxImgUl>
                {announcementDetail.images
                  .filter(
                    (image: IImage) => image.type.toUpperCase() !== "COVER"
                  )
                  .map((image: IImage, index: number) => (
                    <li key={index}>
                      <img
                        onClick={(e: any) => {
                          window.scrollTo(0, 260);
                          if (e.target.style.width === "100vw") {
                            e.target.style.width = "100% ";
                            e.target.style.height = "auto";
                            e.target.style.position = "initial";
                            e.target.style.borderRadius = "0px";
                            e.target.style.objectFit = "cover";
                            e.target.style.left = "0";
                            if (window.innerWidth <= 800) {
                              e.target.style.top = "0";
                              return window.scrollTo(0, 900);
                            } else {
                              e.target.style.top = "0";
                              return window.scrollTo(0, 260);
                            }
                          } else {
                            e.target.style.width = "100vw";
                            e.target.style.height = "100vh";
                            e.target.style.position = "absolute";
                            e.target.style.borderRadius = "20px";
                            e.target.style.objectFit = "contain";
                            e.target.style.left = "0";
                            return (e.target.style.top = "0");
                          }
                        }}
                        ref={ref}
                        src={image.imageUrl}
                        alt="Imagem Galeria do Veículo"
                      />
                    </li>
                  ))}
              </BoxImgUl>
            </BoxFotos>
            <BoxPerfil>
              <div>
                <p>
                  {announcementDetail.user.username.split(" ")[0][0].toUpperCase()}
                  {announcementDetail.user.username.split(" ")[1] &&
                    announcementDetail.user.username.split(" ")[1][0].toUpperCase()}
                </p>
              </div>
              <h3>{announcementDetail.user.username}</h3>
              <p>{announcementDetail.user.bio}</p>
              <Button onClick={goToUserAnnouncement}>Ver todos anúncios</Button>
            </BoxPerfil>
          </div>
        </BoxAnuncio>
        <BoxComments>
          <h2>Comentários</h2>
          {/* <ListComments>
            {announcementDetail.review.length > 0 ? (
              announcementDetail.review.map((comment: any) => (
                <CardComments
                  iniciais={comment.user.name}
                  nome={comment.user.name}
                  id={comment.id}
                  key={comment.id}
                  publicado={comment.createDate}
                  comentario={comment.text}
                  commentOwner={comment.user.id}
                  setReloadPage={setReloadPage}
                  reloadPage={reloadPage}
                />
              ))
            ) : (
              <NoAnnouncement
                phrase={
                  "Nenhum comentario no anuncio de(a)" + announcementDetail.user.name
                }
              />
            )}
          </ListComments> */}
        </BoxComments>
        { token && user && <CommentAnnouncement id={id} setReloadPage={setReloadPage}
                  reloadPage={reloadPage} /> }
      </Box>
    );
  } else {
    return <></>;
  }
};

export default CardAnnouncement;
