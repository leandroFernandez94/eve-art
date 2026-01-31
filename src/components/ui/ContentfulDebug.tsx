'use client';

import { useEffect } from 'react';

export default function ContentfulDebug({ data, label }: { data: any; label: string }) {
  useEffect(() => {
    console.log(`[${label}] Data:`, data);
    
    if (data?.fields?.mainImage) {
      console.log(`[${label}] Main Image:`, {
        hasAsset: !!data.fields.mainImage,
        hasFields: !!data.fields.mainImage?.fields,
        hasFile: !!data.fields.mainImage?.fields?.file,
        url: data.fields.mainImage?.fields?.file?.url,
        fullAsset: data.fields.mainImage,
      });
    }
  }, [data, label]);

  return null;
}
