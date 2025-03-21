import { chakra, Link, Skeleton, useImage } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const NPMBadge = ({ name }: { name: string }) => {
  const encodedPackage = encodeURIComponent(name);
  const src = `https://badge.fury.io/js/${encodedPackage}.svg`;
  const status = useImage({
    src,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const done = status === 'loaded';

    if (!done) return;

    let isMounted = true;

    setTimeout(() => {
      if (isMounted) setIsLoaded(true);
    }, 200);

    return () => {
      isMounted = false;
    };
  }, [status]);

  return (
    <Link alignSelf="flex-end" justifySelf="flex-end" href={`https://www.npmjs.com/package/${encodedPackage}`} target="_blank">
      <Skeleton
        opacity={isLoaded ? undefined : '0.5'}
        colorScheme="gray"
        animation="ease-in-out"
        width="115px"
        isLoaded={isLoaded}
      >
        <chakra.img src={src} alt="npm version" loading="lazy" height="18" />
      </Skeleton>
    </Link>
  );
};

export default NPMBadge;
