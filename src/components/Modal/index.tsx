import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { EmailSchema, SendEmailRequest } from "../../types/emailTypes";
import { sendEmail } from "../../api/axios/emailAxios";

const CreateEmailModal = () => {
  let [isOpen, setIsOpen] = useState(false);

  const emailSchema: yup.ObjectSchema<EmailSchema> = yup.object().shape({
    recipient: yup.string().email().required("Email harus diisi"),
    subject: yup.string().required("Subjek harus diisi"),
    description: yup.string().required("Deskripsi harus diisi"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const handleOnSubmit = async (data: EmailSchema) => {
    const payload: SendEmailRequest = {
      recipient: data.recipient,
      subject: data.subject,
      description: data.description,
    };

    await sendEmail(payload)
      .then(() => {
        alert("Email berhasil dikirim");
        setIsOpen(false);
      })
      .catch((err) => alert(err.message))
      .finally(() => reset());
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        onClick={openModal}
        className="me-5 mt-5 self-end rounded-full border border-transparent bg-blue-500 px-5 py-2 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Create +
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-3 text-lg font-bold leading-6 text-gray-900"
                  >
                    Kirim Email
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <div className="flex flex-col gap-y-2">
                      <label htmlFor="recipient">Email</label>
                      <input
                        type="text"
                        id="recipient"
                        className="rounded-xl border border-gray-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
                        {...register("recipient")}
                      />
                      <p className="text-red-500">
                        {errors.recipient?.message}
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <label htmlFor="subject">Subjek</label>
                      <input
                        type="text"
                        id="subject"
                        className="rounded-xl border border-gray-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
                        {...register("subject")}
                      />
                      <p className="text-red-500">{errors.subject?.message}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <label htmlFor="description">Deskripsi</label>
                      <textarea
                        id="description"
                        className="rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                        {...register("description")}
                      />
                      <span className="text-xs text-red-500">
                        {errors.description?.message}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-col w-full">
                      <button
                        type="submit"
                        className="self-end rounded-full border border-transparent bg-blue-100 px-7 py-2 font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Kirim
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateEmailModal;
