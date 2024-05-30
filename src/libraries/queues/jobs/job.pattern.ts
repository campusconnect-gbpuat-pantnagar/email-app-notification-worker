export enum QueueEventJobPattern {
  // auth queue job and auth worker
  VERIFY_OTP = 'verify_otp',
  ACCOUNT_DELETION_EMAIL = 'account_deletion_email',

  // app queue job and app worker
  WELCOME_EMAIL = 'welcome_email',
  CONNECTION_REQUEST_EMAIL = 'connection_request_email',
  CONNECTION_REQUEST_ACCEPTANCE_EMAIL = 'connection_request_acceptance_email',

  // app queue and content moderation worker service
  POST_CREATION_EVENT = 'post_creation_event',

  // UNIVERSITY_NOTICE_NOTIFICATION queue and UNIVERSITY_NOTICE_NOTIFICATION_BULK for its children  job  university_notice notification worker
  JOB_ALERT_EMAIL = 'job_alert_email',
  JOB_ALERT_EMAIL_TO_USER = 'job_alert_email_to_user',
  UNIVERSITY_NOTICE_EMAIL = 'university_notice_email',
  UNIVERSITY_NOTICE_EMAIL_TO_USER = 'university_notice_email_to_user',
  OFFLINE_EVENT_EMAIL = 'offline_event_email',
  OFFLINE_EVENT_EMAIL_TO_USER = 'offline_event_email_to_user',

  // USER_DYNAMIC_FEED_AND_CONNECTION_SUGGESTION_QUEUE and user_dynamic_feed_and_connection_suggestion_worker
  GENERATE_CONNECTIONS_SUGGESTION = 'generate_connections_suggestion',
}
