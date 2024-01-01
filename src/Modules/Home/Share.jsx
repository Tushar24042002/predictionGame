import React from "react";
import Classes from "./Share.module.css";
import { FaWhatsapp, FaFacebook, FaTelegram, FaLinkedin } from "react-icons/fa";
import {
  FacebookShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import Modal from "../../components/Modal/Modal";
import PrimaryButton from "../../components/ButtonSection/PrimaryButton/PrimaryButton";

const ShareButtons = ({ url, title, closeModal }) => {
  return (
    <Modal>
      <div className={Classes.shareDiv}>
        <div className={Classes.share}>
        <FacebookShareButton url={url} quote={title}>
          <FaFacebook />
        </FacebookShareButton>

        <TelegramShareButton url={url} title={title}>
          <FaTelegram />
        </TelegramShareButton>

        <LinkedinShareButton url={url} title={title}>
          <FaLinkedin />
        </LinkedinShareButton>
        <WhatsappShareButton url={url} title={title}>
          <FaWhatsapp />
        </WhatsappShareButton>
      </div>
      <div className="mt-4">
        <PrimaryButton onClick={()=>closeModal(false)} style={{"width" : "100%"}} label={"Close"} />
      </div>
        </div>
       
    
    </Modal>
  );
};

export default ShareButtons;
