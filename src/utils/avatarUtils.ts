export type AvatarStyle =
  | 'adventurer'
  | 'adventurer-neutral'
  | 'avataaars'
  | 'big-ears'
  | 'big-ears-neutral'
  | 'big-smile'
  | 'bottts'
  | 'croodles'
  | 'croodles-neutral'
  | 'fun-emoji'
  | 'icons'
  | 'identicon'
  | 'initials'
  | 'lorelei'
  | 'lorelei-neutral'
  | 'micah'
  | 'miniavs'
  | 'notionists'
  | 'notionists-neutral'
  | 'open-peeps'
  | 'personas'
  | 'pixel-art'
  | 'pixel-art-neutral'
  | 'shapes'
  | 'thumbs';

interface AvatarOptions {
  style?: AvatarStyle;
  seed?: string;
  backgroundColor?: string;
  radius?: number;
  size?: number;
  flip?: boolean;
  rotate?: number;
  scale?: number;
  translateX?: number;
  translateY?: number;
}

const defaultOptions: Partial<AvatarOptions> = {
  style: 'avataaars',
  backgroundColor: 'transparent',
  radius: 0,
  size: 128,
  flip: false,
  rotate: 0,
  scale: 100,
  translateX: 0,
  translateY: 0,
};

export function generateAvatarUrl(
  seed: string,
  options: Partial<AvatarOptions> = {},
): string {
  const finalOptions = { ...defaultOptions, ...options };
  const {
    style,
    backgroundColor,
    radius,
    size,
    flip,
    rotate,
    scale,
    translateX,
    translateY,
  } = finalOptions;

  const params = new URLSearchParams({
    seed,
    backgroundColor: backgroundColor!,
    radius: radius!.toString(),
    size: size!.toString(),
    flip: flip!.toString(),
    rotate: rotate!.toString(),
    scale: scale!.toString(),
    translateX: translateX!.toString(),
    translateY: translateY!.toString(),
  });

  return `https://api.dicebear.com/7.x/${style}/svg?${params.toString()}`;
}

export function generateGravatarUrl(email: string, size: number = 200): string {
  const hash = email.trim().toLowerCase();
  return `https://gravatar.com/avatar/${hash}?s=${size}&d=404`;
}

export function generateVercelAvatarUrl(
  name: string,
  size: number = 200,
): string {
  return `https://avatar.vercel.sh/${encodeURIComponent(name)}?size=${size}`;
}

export function generateRandomAvatarUrl(seed: string): string {
  const styles: AvatarStyle[] = [
    'adventurer',
    'avataaars',
    'big-smile',
    'bottts',
    'fun-emoji',
    'miniavs',
    'pixel-art',
  ];

  const randomStyle = styles[Math.floor(Math.random() * styles.length)];
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return generateAvatarUrl(seed, {
    style: randomStyle,
    backgroundColor: randomColor,
    radius: 50,
  });
}

export async function getOptimalAvatarUrl(
  email: string,
  name: string,
  preferredStyle?: AvatarStyle,
): Promise<string> {
  const gravatarUrl = generateGravatarUrl(email);
  try {
    const response = await fetch(gravatarUrl);
    if (response.ok) {
      return gravatarUrl;
    }
  } catch (error) {
    console.warn('Gravatar fetch failed:', error);
  }

  if (preferredStyle) {
    return generateAvatarUrl(name, { style: preferredStyle });
  }

  return generateVercelAvatarUrl(name);
}
