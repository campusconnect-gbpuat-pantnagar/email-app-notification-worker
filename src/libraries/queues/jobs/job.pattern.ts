export enum QueueEventJobPattern {
  // auth queue job and auth worker
  VERIFY_OTP = 'verify_otp',
  ACCOUNT_DELETION_EMAIL = 'account_deletion_email',

  // app queue job and app worker
  WELCOME_EMAIL = 'welcome_email',
  CONNECTION_REQUEST_RECEIVED = 'connection_request_received',
  CONNECTION_REQUEST_ACCEPTED = 'connection_request_accepted',

  // app queue and content moderation worker service
  POST_CREATED = 'post_created',

  // UNIVERSITY_NOTIFICATION queue and UNIVERSITY_NOTIFICATION_BULK for its children  job  university_notice notification worker
  JOB_CREATED = 'job_created',
  JOB_CREATED_EMAIL_TO_USER = 'job_created_email_to_user',

  UNIVERSITY_NOTICE_CREATED = 'university_notice_created',
  UNIVERSITY_NOTICE_CREATED_EMAIL_TO_USER = 'university_notice_created_email_to_user',

  EVENT_CREATED = 'event_created',
  EVENT_CREATED_EMAIL_TO_USER = 'event_created_email_to_user',

  // USER_DYNAMIC_FEED_AND_CONNECTION_SUGGESTION_QUEUE and user_dynamic_feed_and_connection_suggestion_worker
  GENERATE_CONNECTIONS_SUGGESTION = 'generate_connections_suggestion',
}
