import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import "./contactform.css";

const initialForm = {
  from_name: "",
  email_id: "",
  message: "",
  telephone: "",
};

const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexComments = /^.{1,255}$/;
  let regexPhone = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

  if (!form.from_name.trim()) {
    errors.from_name = "El campo de `Nombre` es requerido";
  } else if (!regexName.test(form.from_name.trim())) {
    errors.from_name =
      "El campo `Nombre` solo acepta letras y espacios en blanco";
  }

  if (!form.email_id.trim()) {
    errors.email_id = "El campo `Email` es requerido";
  } else if (!regexEmail.test(form.email_id.trim())) {
    errors.email_id = "El campo `Email` es incorrecto";
  }

  if (!form.message.trim()) {
    errors.message = "El campo `Comentarios` es requerido";
  } else if (!regexComments.test(form.message.trim())) {
    errors.message =
      "El campo `Comentarios` no debe exceder los 255 caracteres";
  }

  if (!form.telephone.trim()) {
    errors.telephone = "El campo `Telefono` es requerido";
  } else if (!regexPhone.test(form.telephone.trim())) {
    errors.telephone = "El campo `Telefono` tiene que contener numeros";
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

  const service = "service_contact";
  const templateID = "template_w5tiu2j";

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validationsForm(form);
    setErrors(validationErrors);

    console.log(validationErrors); // Para depurar

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      console.log(form); // Para verificar los valores antes de enviarlos

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
            setErrors({}); // Limpiar errores al enviar
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
      <form
        ref={formRef}
        className="contact-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          className="btn-form"
          type="text"
          name="from_name"
          id="from_name"
          placeholder="Ingresá tu nombre *"
          onChange={handleChange}
          value={form.from_name}
          required
        />
        {errors.from_name && (
          <span className="form-error">{errors.from_name}</span>
        )}
        <input
          className="btn-form"
          type="text"
          name="telephone"
          id="telephone"
          placeholder="Ingresá tu telefono *"
          onChange={handleChange}
          value={form.telephone}
          required
        />
        {errors.telephone && (
          <span className="form-error">{errors.telephone}</span>
        )}
        <input
          className="btn-form"
          type="email"
          name="email_id"
          id="email_id"
          placeholder="Ingresá tu email *"
          onChange={handleChange}
          value={form.email_id}
          required
        />
        {errors.email_id && (
          <span className="form-error">{errors.email_id}</span>
        )}
        <textarea
          name="message"
          id="message"
          cols="50"
          rows="10"
          placeholder="Dejáme tus comentarios"
          onChange={handleChange}
          value={form.message}
          required
        />
        {errors.message && <span className="form-error">{errors.message}</span>}
        <input
          type="submit"
          className="btn-enviar"
          value="ENVIAR"
          id="button"
          disabled={isSubmitting}
        />
      </form>
    </>
  );
};

export default ContactForm;
