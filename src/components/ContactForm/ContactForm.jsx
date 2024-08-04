import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import "./contactform.css";

const initialForm = {
  name: "",
  email: "",
  comments: "",
};

const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexComments = /^.{1,255}$/;

  if (!form.name.trim()) {
    errors.name = "El campo de nombre es requerido";
  } else if (!regexName.test(form.name.trim())) {
    errors.name = "El campo `Nombre` solo acepta letras y espacios en blanco";
  }

  if (!form.email.trim()) {
    errors.email = "El campo Email es requerido";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "El campo `Email` es incorrecto";
  }

  if (!form.comments.trim()) {
    errors.comments = "El campo `Comentarios` es requerido";
  } else if (!regexComments.test(form.comments.trim())) {
    errors.comments =
      "El campo `Comentarios` no debe exceder los 255 caracteres";
  }

  return errors;
};

const ContactForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const service = "service_mfmpscg";
  const templateID = "template_1jyyg2h";

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validationsForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      emailjs
        .sendForm(service, templateID, formRef.current, "WYVJMvEJlHQIHxScZ")
        .then(
          (response) => {
            console.log(response.text);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Correo enviado!",
              showConfirmButton: false,
              timer: 1500,
            });
            setForm(initialForm);
            setTimeout(() => setIsSubmitting(false), 1500);
          },
          (error) => {
            console.log(error.text);
            alert("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
            setTimeout(() => setIsSubmitting(false), 1500);
          }
        );

      e.target.reset();
    }
  };

  return (
    <>
      <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
        <input
          className="btn-form"
          type="text"
          name="name"
          placeholder="Ingresá tu nombre *"
          onChange={handleChange}
          value={form.name}
          required
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
        <input
          className="btn-form"
          type="email"
          name="email"
          placeholder="Ingresá tu email *"
          onChange={handleChange}
          value={form.email}
          required
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
        <textarea
          name="comments"
          cols="50"
          rows="10"
          placeholder="Dejáme tus comentarios"
          onChange={handleChange}
          value={form.comments}
          required
        />
        {errors.comments && (
          <span className="form-error">{errors.comments}</span>
        )}
        <input
          type="submit"
          className="btn-enviar"
          value="ENVIAR"
          disabled={isSubmitting}
        />
      </form>
    </>
  );
};

export default ContactForm;
