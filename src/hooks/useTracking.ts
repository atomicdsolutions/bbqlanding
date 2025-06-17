import { useEffect } from 'react';
import { useRouter } from 'next/router';

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set' | 'js',
      action: string,
      params?: any
    ) => void;
    fbq: (
      command: string,
      event: string,
      params?: any
    ) => void;
  }
}

type TrackingEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

type ConsultationData = {
  eventType: string;
  partySize: string;
  serviceType: string;
};

export const useTracking = () => {
  const router = useRouter();

  // Track page views
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
          page_path: url,
        });
      }
      if (window.fbq) {
        window.fbq('track', 'PageView');
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Track custom events
  const trackEvent = ({ action, category, label, value }: TrackingEvent) => {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  // Track menu interactions
  const trackMenuInteraction = (itemName: string, action: 'view' | 'select') => {
    trackEvent({
      action: action === 'view' ? 'menu_item_view' : 'menu_item_select',
      category: 'Menu',
      label: itemName,
    });

    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_type: 'menu_item',
        content_name: itemName,
      });
    }
  };

  // Track consultation form submissions
  const trackConsultationSubmission = (data: ConsultationData) => {
    trackEvent({
      action: 'consultation_submit',
      category: 'Forms',
      label: data.eventType,
    });

    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_category: 'consultation',
        content_name: data.eventType,
        value: data.partySize === 'large' ? 1000 : 500,
        currency: 'USD',
      });
    }
  };

  // Track package selection
  const trackPackageSelection = (packageName: string, price: number) => {
    trackEvent({
      action: 'package_select',
      category: 'Packages',
      label: packageName,
      value: price,
    });

    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_type: 'package',
        content_name: packageName,
        value: price,
        currency: 'USD',
      });
    }
  };

  // Track social sharing
  const trackSocialShare = (platform: string, contentType: string) => {
    trackEvent({
      action: 'social_share',
      category: 'Social',
      label: `${platform}_${contentType}`,
    });
  };

  // Track document downloads
  const trackDownload = (documentName: string) => {
    trackEvent({
      action: 'download',
      category: 'Downloads',
      label: documentName,
    });
  };

  // Track gallery image views
  const trackGalleryView = (imageName: string) => {
    trackEvent({
      action: 'gallery_view',
      category: 'Gallery',
      label: imageName,
    });
  };

  // Track specific conversion goals
  const trackConversion = (goalName: string, value?: number) => {
    trackEvent({
      action: 'conversion',
      category: 'Goals',
      label: goalName,
      value: value,
    });

    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        content_type: goalName,
        value: value,
        currency: 'USD',
      });
    }
  };

  return {
    trackEvent,
    trackMenuInteraction,
    trackConsultationSubmission,
    trackPackageSelection,
    trackSocialShare,
    trackDownload,
    trackGalleryView,
    trackConversion,
  };
};

// Custom hooks for specific features
export const useMenuTracking = () => {
  const { trackMenuInteraction } = useTracking();
  
  const trackItemView = (itemName: string) => {
    trackMenuInteraction(itemName, 'view');
  };
  
  const trackItemSelect = (itemName: string) => {
    trackMenuInteraction(itemName, 'select');
  };
  
  return { trackItemView, trackItemSelect };
};

export const useConsultationTracking = () => {
  const { trackConsultationSubmission } = useTracking();
  
  const trackSubmission = (data: ConsultationData) => {
    trackConsultationSubmission(data);
  };
  
  return { trackSubmission };
};