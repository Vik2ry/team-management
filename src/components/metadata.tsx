interface Props {
    seoTitle: string;
    seoDescription: string;
  }
  
  export default function MetadataHelper({ seoTitle, seoDescription }: Props) {
    return (
      <>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
      </>
    );
  }