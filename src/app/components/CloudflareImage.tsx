const CLOUDFLARE_ACCOUNT_HASH = 'EBSSfnGYYD9-tGTmYMjDgg';
const CLOUDFLARE_IMAGE_URL = `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}`;

type CloudflareImageProps = {
  imageId: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'async' | 'sync' | 'auto';
};

export const CloudflareImage = ({
  imageId,
  alt,
  className,
  loading = 'lazy',
  fetchPriority,
  decoding = 'async'
}: CloudflareImageProps) => {
  const imageUrl = `${CLOUDFLARE_IMAGE_URL}/${imageId}/public`;

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
    />
  );
};

// For responsive images
type ResponsiveCloudflareImageProps = CloudflareImageProps & {
  variants: {
    variant: string;
    width: number;
  }[];
  sizes: string;
};

export const ResponsiveCloudflareImage = ({
  imageId,
  alt,
  variants,
  sizes,
  className,
  loading = 'lazy',
  fetchPriority,
  decoding = 'async'
}: ResponsiveCloudflareImageProps) => {
  const srcSet = variants
    .map(({ variant, width }) => 
      `${CLOUDFLARE_IMAGE_URL}/${imageId}/${variant} ${width}w`
    )
    .join(', ');

  return (
    <img
      src={`${CLOUDFLARE_IMAGE_URL}/${imageId}/${variants[0].variant}`}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
    />
  );
};

// Add a new utility function to get Cloudflare image URL
const getCloudflareImageUrl = (imageId: string) => 
  `https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/${imageId}/public`;

// Add a new component for background images
type CloudflareBackgroundProps = {
  imageId: string;
  className?: string;
  children?: React.ReactNode;
};

export const CloudflareBackground = ({
  imageId,
  className,
  children
}: CloudflareBackgroundProps) => {
  return (
    <div 
      style={{ backgroundImage: `url(${getCloudflareImageUrl(imageId)})` }}
      className={className}
    >
      {children}
    </div>
  );
}; 