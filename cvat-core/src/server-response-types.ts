// Copyright (C) 2023 CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import {
    ChunkType,
    DimensionType, JobStage, JobState, JobType, ProjectStatus,
    ShareFileType, TaskMode, TaskStatus,
} from 'enums';
import { SerializedModel } from 'core-types';

export interface SerializedAnnotationImporter {
    name: string;
    ext: string;
    version: string;
    enabled: boolean;
    dimension: DimensionType;
}

export type SerializedAnnotationExporter = SerializedAnnotationImporter;

export interface SerializedAnnotationFormats {
    importers: SerializedAnnotationImporter[];
    exporters: SerializedAnnotationExporter[];
}

export interface FunctionsResponseBody {
    results: SerializedModel[];
    count: number;
}

export interface ProjectsFilter {
    page?: number;
    id?: number;
    sort?: string;
    search?: string;
    filter?: string;
}

export interface SerializedUser {
    url: string;
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email?: string;
    groups?: ('user' | 'business' | 'admin')[];
    is_staff?: boolean;
    is_superuser?: boolean;
    is_active?: boolean;
    last_login?: string;
    date_joined?: string;
}

export interface SerializedProject {
    assignee: SerializedUser | null;
    id: number;
    bug_tracker: string;
    created_date: string;
    updated_date: string;
    dimension: DimensionType;
    name: string;
    organization: number | null;
    guide_id: number | null;
    owner: SerializedUser;
    source_storage: { id: number; location: 'local' | 'cloud'; cloud_storage_id: null };
    target_storage: { id: number; location: 'local' | 'cloud'; cloud_storage_id: null };
    url: string;
    tasks: { count: number; url: string; };
    task_subsets: string[];
    status: ProjectStatus;
}

export type TasksFilter = ProjectsFilter & { ordering?: string; }; // TODO: Need to clarify how "ordering" is used
export type JobsFilter = ProjectsFilter & {
    task_id?: number;
};

export interface SerializedTask {
    assignee: SerializedUser | null;
    bug_tracker: string;
    created_date: string;
    data: number;
    data_chunk_size: number | null;
    data_compressed_chunk_type: ChunkType
    data_original_chunk_type: ChunkType;
    dimension: DimensionType;
    id: number;
    image_quality: number;
    jobs: { count: 1; completed: 0; url: string; validation: 0 };
    labels: { count: number; url: string; };
    mode: TaskMode | '';
    name: string;
    organization: number | null;
    overlap: number | null;
    owner: SerializedUser;
    project_id: number | null;
    guide_id: number | null;
    segment_size: number;
    size: number;
    source_storage: { id: number; location: 'local' | 'cloud'; cloud_storage_id: null };
    target_storage: { id: number; location: 'local' | 'cloud'; cloud_storage_id: null };
    status: TaskStatus;
    subset: string;
    updated_date: string;
    url: string;
}

export interface SerializedJob {
    assignee: SerializedUser | null;
    bug_tracker: string;
    data_chunk_size: number | null;
    data_compressed_chunk_type: ChunkType
    dimension: DimensionType;
    id: number;
    issues: { count: number; url: string };
    labels: { count: number; url: string };
    mode: TaskMode;
    project_id: number | null;
    guide_id: number | null;
    stage: JobStage;
    state: JobState;
    type: JobType;
    frame_count: number;
    start_frame: number;
    stop_frame: number;
    task_id: number;
    updated_date: string;
    created_date: string;
    url: string;
}

export type AttrInputType = 'select' | 'radio' | 'checkbox' | 'number' | 'text';
export interface SerializedAttribute {
    name: string;
    mutable: boolean;
    input_type: AttrInputType;
    default_value: string;
    values: string[];
    id?: number;
}

export type LabelType = 'rectangle' | 'polygon' | 'polyline' | 'points' | 'ellipse' | 'cuboid' | 'skeleton' | 'mask' | 'tag' | 'any';
export interface SerializedLabel {
    id?: number;
    name: string;
    color?: string;
    type: LabelType;
    svg?: string;
    sublabels?: SerializedLabel[];
    has_parent?: boolean;
    attributes: SerializedAttribute[];
}

export interface SerializedAbout {
    description: string;
    name: string;
    version: string;
}

export interface SerializedRemoteFile {
    name: string;
    type: ShareFileType;
    mime_type: string;
}

export interface SerializedUserAgreement {
    name: string;
    required: boolean;
    textPrefix: string;
    url: string;
    urlDisplayText: string;
    value: boolean;
}

export interface SerializedRegister {
    email: string;
    email_verification_required: boolean;
    first_name: string;
    last_name: string;
    username: string;
}

export interface SerializedGuide {
    id?: number;
    task_id: number | null;
    project_id: number | null;
    owner: SerializedUser;
    created_date: string;
    updated_date: string;
    markdown: string;
}

export interface SerializedAsset {
    uuid?: string;
    guide?: number;
    filename: string;
    created_date: string;
    owner: SerializedUser;
}

export interface SerializedOrganizationContact {
    email?: string;
    location?: string;
    phoneNumber?: string
}

export interface SerializedOrganization {
    id?: number,
    slug?: string,
    name?: string,
    description?: string,
    created_date?: string,
    updated_date?: string,
    owner?: any,
    contact?: SerializedOrganizationContact,
}

export interface SerializedQualitySettingsData {
    id?: number;
    task?: number;
    iou_threshold?: number;
    oks_sigma?: number;
    line_thickness?: number;
    low_overlap_threshold?: number;
    compare_line_orientation?: boolean;
    line_orientation_threshold?: number;
    compare_groups?: boolean;
    group_match_threshold?: number;
    check_covered_annotations?: boolean;
    object_visibility_threshold?: number;
    panoptic_comparison?: boolean;
    compare_attributes?: boolean;
}
