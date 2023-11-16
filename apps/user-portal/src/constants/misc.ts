
// 阿里云VOD支持的视频媒体格式
export enum AcceptFileExtension {
  Videos = '.MP4,.FLV,.M3U8,.WEBM', // 阿里云VOD支持的视频媒体格式
  Images = '.png,.jpg,.jpeg,.bmp,webp' // 阿里云VOD安全内容审核支持的图片格式
}

export const Weekdays: string[] = [
  // 数组下标同ISO day of the week一致，1代表周一，7代表周日，0占位无意义
  '', '周一', '周二', '周三', '周四', '周五', '周六', '周日'
]

export const DayRange: string[][] = [
  ['凌晨', '00:00—06:00'], ['早上', '06:00—12:00'],
  ['下午', '12:00—18:00'], ['晚上', '18:00—24:00']
]

export const FillStyle: string[] = ['green-light', 'green-medium', 'green-dark']

export const Timestamps: string[] = [
  '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30',
  '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
]

export const PageNo: number = 1
export const PageSize: number = 20

export const defaultCityCode = '320100'

export const CoursePhoto = '课程照片'
