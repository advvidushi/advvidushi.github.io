(function () {
  /* PostHog — custom events only; session replay unmasked */
  !(function (t, e) {
    var o, n, p, r;
    e.__SV ||
      (window.posthog && window.posthog.__loaded) ||
      ((window.posthog = e),
      (e._i = []),
      (e.init = function (i, s, a) {
        function g(t, e) {
          var o = e.split(".");
          2 == o.length && ((t = t[o[0]]), (e = o[1]));
          t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          };
        }
        p ||
          (((p = t.createElement("script")).type = "text/javascript"),
          (p.crossOrigin = "anonymous"),
          (p.async = !0),
          (p.src = s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js"),
          (p.onerror = function () {
            p = null;
          }),
          (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r));
        var u = e;
        for (
          void 0 !== a ? (u = e[a] = []) : (a = "posthog"),
            u.people = u.people || [],
            Object.defineProperty(u, "toString", {
              configurable: !0,
              enumerable: !0,
              writable: !0,
              value: function (t) {
                var e = "posthog";
                return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e;
              }
            }),
            Object.defineProperty(u.people, "toString", {
              configurable: !0,
              enumerable: !0,
              writable: !0,
              value: function () {
                return u.toString(1) + ".people (stub)";
              }
            }),
            o =
              "El Rl Pl Al Ll init iu ru Xl tu au fa eu uu Jl cu fu pu capture getExtension nu Ml yu calculateEventProperties mu register register_once register_for_session unregister unregister_for_session ku Yl bu getFeatureFlag getFeatureFlagPayload getFeatureFlagResult getAllFeatureFlags isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync Su identify setPersonProperties unsetPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset xu shutdown setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty vu createPersonProfile setInternalOrTestUser wu Dl $l opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing hu debug pa ns getPageViewId captureTraceFeedback captureTraceMetric Vl".split(
                " "
              ),
            n = 0;
          n < o.length;
          n++
        )
          g(u, o[n]);
        e._i.push([i, s, a]);
      }),
      (e.__SV = 1));
  })(document, window.posthog || []);

  posthog.init("phc_pBANNSZka67iRwLEHRYyr3QJjth2zkWQF4V7BKv6jqFj", {
    api_host: "https://us.i.posthog.com",
    defaults: "2026-05-30",
    person_profiles: "identified_only",
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    capture_dead_clicks: false,
    capture_heatmaps: false,
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: false,
      maskInputOptions: {
        password: false,
        email: false,
        text: false,
        textarea: false,
        select: false,
        tel: false,
        number: false,
        search: false,
        url: false
      },
      maskTextSelector: ".do-not-mask-any-text",
      maskTextClass: "do-not-mask-any-text",
      blockSelector: ".do-not-block-any-element",
      inlineImages: true,
      collectFonts: true,
      recordCrossOriginIframes: true
    }
  });

  /* Google Analytics — page views and events are sent only from custom trackEvent calls */
  var ga = document.createElement("script");
  ga.async = true;
  ga.src = "https://www.googletagmanager.com/gtag/js?id=G-2WL1YZF6MS";
  document.head.appendChild(ga);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  gtag("js", new Date());
  gtag("config", "G-2WL1YZF6MS", { send_page_view: true });

  window.trackEvent = function (name, properties) {
    var props = properties || {};
    if (window.posthog && typeof posthog.capture === "function") {
      posthog.capture(name, props);
    }
    if (typeof window.gtag === "function") {
      var gaName = String(name)
        .replace(/[^a-zA-Z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "")
        .slice(0, 40);
      gtag("event", gaName, Object.assign({ event_readable_name: name }, props));
    }
  };
})();
