import { Image, Loader2, MousePointerSquareDashed, X } from "lucide-react";
// import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import React, { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { Button } from "@/components/ui/button";
import { ApiResponse } from "@/utils/types";

type uploadedFileType = {
	image: string;
	thumb: string;
};

interface DropzoneInputProps {
	onChange?: (files: uploadedFileType[]) => void;
	value?: File[];
	maxFiles?: number;
	maxSize?: number;
	accept?: Record<string, string[]>;
	disabled?: boolean;
	defaultFiles?: uploadedFileType[];
}

const DropzoneInput = ({
	onChange,
	value = [],
	maxFiles = 5,
	maxSize = 1024 * 1024 * 2, // 2MB
	accept = {
		"image/*": [],
	},
	disabled = false,
	defaultFiles,
	...props
}: DropzoneInputProps) => {
	const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [uploadedFiles, setUploadedFiles] = useState<uploadedFileType[]>(
		defaultFiles ?? []
	);
	const [isPending, startTransition] = useTransition();
	// const [uploadProgress, setUploadProgress] = useState<number>(0);

	// const { startUpload, isUploading } = useUploadThing("imageUploader", {
	// 	onClientUploadComplete: ([data]) => {
	// 		const configId = data.serverData.configId;
	// 		startTransition(() => {
	// 			router.push(`/configure/design?id=${configId}`);
	// 		});
	// 	},
	// 	onUploadProgress(p) {
	// 		setUploadProgress(p);
	// 	},
	// });

	// Initialize files from value prop
	React.useEffect(() => {
		if (value && value.length > 0) {
			const filesWithPreview = value.map((file) =>
				Object.assign(file, {
					image: URL.createObjectURL(file),
					thumb: URL.createObjectURL(file),
				})
			) as uploadedFileType[];

			setUploadedFiles(filesWithPreview);
		}
	}, [value]);

	// Clean up previews when component unmounts
	React.useEffect(() => {
		return () => {
			uploadedFiles.forEach((file) => URL.revokeObjectURL(file.image));
		};
	}, [uploadedFiles]);

	const startUpload = (acceptedFiles: File[]) => {
		setIsUploading(true);
		startTransition(() => {
			const uploadFiles = async () => {
				try {
					if (!acceptedFiles)
						throw new Error("Please select a file to upload");

					const formData = new FormData();
					acceptedFiles.forEach((file) => {
						formData.append("images", file); // Append files to FormData object
					});

					const response = await api.post("/file/upload", formData, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					});

					const result = (await response.data) as ApiResponse<
						{ main: string; thumb: string }[]
					>;
					console.log("FILE UPLOADED =>", result);

					if (result.success) {
						if (result.data) {
							const uploaded = result.data.map((file) => {
								return {
									image: file.main,
									thumb: file.thumb,
								};
							});
							setUploadedFiles(uploaded);
							onChange?.(uploaded);
						}
					}

					// setIsUploading(false);
					// setUploadedFiles(
					// 	result.data.map((file: uploadedFileType) =>
					// 		Object.assign(file, {
					// 			image: URL.createObjectURL(file),
					// 			thumbs: URL.createObjectURL(file),
					// 		})
					// 	)
					// );
				} catch (error) {
					console.log(error);
					setIsUploading(false);
				}
			};

			uploadFiles();
		});

		setIsUploading(false);
	};

	const onDropRejected = (rejectedFiles: FileRejection[]) => {
		const [file] = rejectedFiles;
		setIsDraggedOver(false);
		toast.error(`${file.file.type} is not supported.`);
	};

	const onDropAccepted = (acceptedFiles: File[]) => {
		console.log(acceptedFiles);
		startUpload(acceptedFiles);
		setIsDraggedOver(false);
	};

	const removeFile = (index: number) => {
		const newFiles = [...uploadedFiles];
		URL.revokeObjectURL(newFiles[index].image);
		newFiles.splice(index, 1);
		setUploadedFiles(newFiles);
		onChange?.(newFiles);
	};

	return (
		<>
			<div
				className={cn(
					"relative h-full flex-1 w-full bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 flex justify-center flex-col items-center",
					{
						"ring-blue-900/25 bg-blue-900/10": isDraggedOver,
					}
				)}>
				<div className="relative flex flex-1 flex-col items-center justify-center w-full">
					<Dropzone
						onDropRejected={onDropRejected}
						onDropAccepted={onDropAccepted}
						accept={accept}
						onDragEnter={() => setIsDraggedOver(true)}
						onDragLeave={() => setIsDraggedOver(false)}
						maxFiles={maxFiles}
						maxSize={maxSize}
						disabled={disabled}
						{...props}>
						{({ getRootProps, getInputProps }) => (
							<div
								className="h-full w-full flex-1 flex flex-col items-center justify-center"
								{...getRootProps()}>
								<input {...getInputProps()} />
								{isDraggedOver ? (
									<MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
								) : isUploading || isPending ? (
									<Loader2 className="animate-spin h-6 w-6 mb-2 text-zinc-500" />
								) : (
									<Image className="h-6 w-6 text-zinc-500 mb-2" />
								)}

								<div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
									{isUploading ? (
										<div className="flex-flex-col items-center text-center">
											<p>Uploading...</p>
											{/* <Progress
											className="mt-2 w-40 h-2 bg-gray-300"
											value={uploadProgress}
										/> */}
										</div>
									) : isPending ? (
										<div className="flex flex-col items-center">
											<p>Redirecting please wait...</p>
										</div>
									) : isDraggedOver ? (
										<p>
											<span className="font-semibold">
												Drop file
											</span>
											to upload
										</p>
									) : (
										<p>
											<span className="font-semibold">
												Click to upload
											</span>
											or drag and drop
										</p>
									)}
								</div>

								{isPending ? null : (
									<p className="text-xs text-zinc-500">
										PNG, JPEG, JPG
									</p>
								)}
							</div>
						)}
					</Dropzone>
				</div>
			</div>
			{uploadedFiles.length > 0 && (
				<div className="flex flex-wrap gap-4">
					{uploadedFiles.map((file, index) => (
						<div key={index} className="relative group">
							<div className="overflow-hidden border border-border">
								<img
									src={file.image || "/placeholder.svg"}
									alt={`image ${index}`}
									className="h-20 w-20 object-cover"
									onLoad={() => {
										URL.revokeObjectURL(file.image);
									}}
								/>
							</div>
							<Button
								type="button"
								variant="destructive"
								size="icon"
								className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
								onClick={() => removeFile(index)}>
								<X className="h-3 w-3" />
							</Button>
							<p className="mt-1 text-xs text-muted-foreground truncate max-w-[128px]">
								{`image ${index}`}
							</p>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default DropzoneInput;
