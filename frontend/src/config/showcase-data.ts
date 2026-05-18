import groupPhoto from '../assets/showcase/group_photo.webp';
import groupPhotoHats from '../assets/showcase/group_photo_hats.webp';
import graduationPhoto from '../assets/showcase/graduation_photo.webp';
import photoWithGirlFriend from '../assets/showcase/photo_with_my_baby.webp';

import type { ShowcaseItem } from '../../src/types';

export const showcaseItems: ShowcaseItem[] = [
  {
    id: 'e1',
    title: 'Group Photo',
    image: groupPhoto,
  },
  {
    id: 'e2',
    title: 'Group Photo with Hats',
    image: groupPhotoHats,
  },
  {
    id: 'p1',
    title: 'Graduation Photo',
    image: graduationPhoto,
  },
  {
    id: 'p2',
    title: 'With My Baby',
    image: photoWithGirlFriend,
  },
];