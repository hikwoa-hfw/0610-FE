"use client";
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Unauthorized from "@/components/Unauthorized";
import useGetEventOrganizerBySlug from "@/hooks/api/events/useGetEventOrganizerBySlug";
import useUpdateEvent from "@/hooks/api/events/useUpdateEvent";
import { getChangedValues } from "@/utils/getChangedValue";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ChangeEvent, FC, useRef, useState } from "react";
import ModalDeleteEvent from "./ModalDeleteEvent";
import useDeleteEvent from "@/hooks/api/events/useDeleteEvent";
import Link from "next/link";
const TiptapRichtextEditor = dynamic(
  () => import("@/components/TipTapRichTextEditor"),
  { ssr: false },
);

interface EditEventFormProps {
  slug: string;
}
const EditEventForm: FC<EditEventFormProps> = ({ slug }) => {
  const { data: event, isPending: isPendingGetEvent } =
    useGetEventOrganizerBySlug(slug);
  const { mutateAsync: updateEvent, isPending: isPendingUpdateEvent } =
    useUpdateEvent(event?.slug);
  const { mutateAsync: deleteEvent, isPending: isPendingDeleteEvent } =
    useDeleteEvent();
  const session = useSession();

  const initialValues = {
    name: event?.name || "",
    description: event?.description || "",
    category: event?.category || "",
    locationDetail: event?.locationDetail || "",
    startDate: event?.startDate || "",
    endDate: event?.endDate || "",
    thumbnail: null,
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const payload = getChangedValues(values, initialValues);
      await updateEvent(payload);
    },
  });
  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("thumbnail", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };


  const handleDelete = async () => {
    await deleteEvent(slug);
  };

  const removeThumbnail = () => {
    formik.setFieldValue("thumbnail", null);
    setSelectedImage("");
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  if (isPendingGetEvent) {
    return <Loading />;
  }

  if (!event) {
    return <NoData />;
  }

  if (event.userId !== Number(session.data?.user.id)) return <Unauthorized />;

  return (
    <form className="mt-10 space-y-4" onSubmit={formik.handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="name"
          required
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {!!formik.touched.name && !!formik.errors.name && (
          <p className="text-xs text-red-600">{formik.errors.name}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          type="text"
          placeholder="category"
          required
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {!!formik.touched.category && !!formik.errors.category && (
          <p className="text-xs text-red-600">{formik.errors.category}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="locationDetail">Location</Label>
        <Input
          id="locationDetail"
          name="locationDetail"
          type="text"
          placeholder="locationDetail"
          required
          value={formik.values.locationDetail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {!!formik.touched.locationDetail && !!formik.errors.locationDetail && (
          <p className="text-xs text-red-600">{formik.errors.locationDetail}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="description"
          required
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{ resize: "none" }}
        />
        {!!formik.touched.description && !!formik.errors.description && (
          <p className="text-xs text-red-600">{formik.errors.description}</p>
        )}
      </div>
      {selectedImage ? (
        <>
          <div className="relative h-[150px] w-[200px]">
            <Image
              src={selectedImage}
              alt="thumbnail"
              className="object-cover"
              fill
            />
          </div>
          <Button variant="destructive" type="button" onClick={removeThumbnail}>
            Remove Image
          </Button>
        </>
      ) : (
        <div className="grid gap-2">
          <Label htmlFor="thumbnail">Thumbnail</Label>
          <Input
            ref={thumbnailRef}
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={onChangeThumbnail}
          />
          {!!formik.touched.thumbnail && !!formik.errors.thumbnail && (
            <p className="text-xs text-red-600">{formik.errors.thumbnail}</p>
          )}
        </div>
      )}
      <div className="flex justify-end">
        <div className="space-x-4">
          <Link href="/dashboard/events">
          <Button className="my-10">
            Cancel
          </Button>
          </Link>

          <ModalDeleteEvent
            isPending={isPendingDeleteEvent}
            onClick={handleDelete}
          />

          <Button
            type="submit"
            disabled={isPendingUpdateEvent || !formik.dirty}
            className="my-10"
          >
            {isPendingUpdateEvent ? "Loading..." : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditEventForm;
